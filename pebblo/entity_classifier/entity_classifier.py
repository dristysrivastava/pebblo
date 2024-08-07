from presidio_analyzer import AnalyzerEngine
from presidio_analyzer.context_aware_enhancers import LemmaContextAwareEnhancer
from presidio_anonymizer import AnonymizerEngine

from pebblo.entity_classifier.utils.config import (
    ConfidenceScore,
    Entities,
    SecretEntities,
)
from pebblo.entity_classifier.utils.utils import (
    add_custom_regex_analyzer_registry,
    get_entities,
)
from pebblo.log import get_logger

logger = get_logger(__name__)


class EntityClassifier:
    def __init__(self):
        self.analyzer = AnalyzerEngine()
        self.anonymizer = AnonymizerEngine()
        self.entities = list(Entities.__members__.keys())
        self.entities.extend(list(SecretEntities.__members__.keys()))
        self.custom_analyze()

    def custom_analyze(self):
        # Adding custom analyzer
        custom_registry = add_custom_regex_analyzer_registry()
        custom_registry.load_predefined_recognizers()
        self.analyzer = AnalyzerEngine(
            registry=custom_registry,
            context_aware_enhancer=LemmaContextAwareEnhancer(
                context_similarity_factor=float(
                    ConfidenceScore.EntityContextSimilarityFactor.value
                ),
                min_score_with_context_similarity=float(
                    ConfidenceScore.EntityMinScoreWithContext.value
                ),
            ),
        )

    def analyze_response(self, input_text, anonymize_all_entities=True):
        # Returns analyzed output
        analyzer_results = self.analyzer.analyze(text=input_text, language="en")
        analyzer_results = [
            result
            for result in analyzer_results
            if result.score >= float(ConfidenceScore.Entity.value)
        ]
        if not anonymize_all_entities:  # Condition for anonymized document
            analyzer_results = [
                result
                for result in analyzer_results
                if result.entity_type in self.entities
            ]
        return analyzer_results

    def anonymize_response(self, analyzer_results, input_text):
        # Returns anonymized output
        anonymized_text = self.anonymizer.anonymize(
            text=input_text, analyzer_results=analyzer_results
        )

        return anonymized_text.items, anonymized_text.text

    def presidio_entity_classifier_and_anonymizer(
        self, input_text, anonymize_snippets=False
    ):
        """
        Perform classification on the input data and return a dictionary with the count of each entity group.
        And also returns plain input text as anonymized text output
        :param anonymize_snippets: Flag whether to anonymize snippets in report.
        :param input_text: Input string / document snippet
        :return: entities: containing the entity group Name as key and its count as value.
                 total_count: Total count of entity groupsInput text in anonymized form.
                 anonymized_text: Input text in anonymized form.
        Example:

        input_text = " My SSN is 222-85-4836.
        ITIN number 993-77 0690
        And AWS Access Key is: AKIAQIPT4PDORIRTV6PH."
        response:
        entities = {'aws-access-key': 1, 'us-itin': 1, 'us-ssn': 1}
        total_count = 3
        anonymized_text = "My SSN is &lt;US_SSN&gt;.
        ITIN number &lt;US_ITIN&gt;
        And AWS Access Key is: &lt;AWS_ACCESS_KEY&gt;."
        """
        entities = {}
        total_count = 0
        anonymized_text = ""
        try:
            logger.debug("Presidio Entity Classifier and Anonymizer Started.")

            analyzer_results = self.analyze_response(input_text)
            anonymized_response, anonymized_text = self.anonymize_response(
                analyzer_results, input_text
            )
            if anonymize_snippets:  # If Document snippet needs to be anonymized
                input_text = anonymized_text.replace("<", "&lt;").replace(">", "&gt;")
            entities, total_count = get_entities(self.entities, anonymized_response)
            logger.debug("Presidio Entity Classifier and Anonymizer Finished")
            logger.debug(f"Entities: {entities}")
            logger.debug(f"Entity Total count: {total_count}")
            return entities, total_count, input_text
        except Exception as e:
            logger.error(
                f"Presidio Entity Classifier and Anonymizer Failed, Exception: {e}"
            )
            return entities, total_count, input_text

from fastapi import APIRouter

from pebblo.app.service.discovery_service import AppDiscover
from pebblo.app.service.prompt_service import AppPrompt
from pebblo.app.service.service import AppLoaderDoc


class App:
    """
    Controller Class for all the api endpoints for App resource.
    """

    def __init__(self, prefix: str):
        self.router = APIRouter(prefix=prefix)

    @staticmethod
    def discover(data: dict):
        # "/app/discover" API entrypoint
        discovery_obj = AppDiscover(data=data)
        response = discovery_obj.process_request()
        return response

    @staticmethod
    def loader_doc(data: dict):
        # "/loader/doc" API entrypoint
        loader_doc_obj = AppLoaderDoc(data=data)
        response = loader_doc_obj.process_request()
        return response

    @staticmethod
    def prompt(data: dict):
        # "/app/prompt" API entrypoint
        prompt_obj = AppPrompt(data=data)
        response = prompt_obj.process_request()
        return response

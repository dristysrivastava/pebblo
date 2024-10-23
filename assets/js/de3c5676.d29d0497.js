"use strict";(self.webpackChunkclassic=self.webpackChunkclassic||[]).push([[2130],{2532:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var i=t(4848),r=t(8453);const s={},a="Safe Retriever for LangChain",o={id:"retrieval_chain",title:"Safe Retriever for LangChain",description:"Identity-enabled RAG using PebbloRetrievalQA",source:"@site/docs/retrieval_chain.md",sourceDirName:".",slug:"/retrieval_chain",permalink:"/pebblo/retrieval_chain",draft:!1,unlisted:!1,editUrl:"https://github.com/daxa-ai/pebblo/tree/main/docs/gh_pages/docs/retrieval_chain.md",tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Pebblo Safe DataLoader for Langchain",permalink:"/pebblo/rag"},next:{title:"Pebblo Safe DataReader for LlamaIndex",permalink:"/pebblo/llama_index_safe_reader"}},l={},d=[{value:"Setup",id:"setup",level:2},{value:"Dependencies",id:"dependencies",level:3},{value:"Identity-aware Data Ingestion",id:"identity-aware-data-ingestion",level:3},{value:"Retrieval with Identity &amp; Semantic Enforcement",id:"retrieval-with-identity--semantic-enforcement",level:2},{value:"Parameters",id:"parameters",level:3},{value:"Questions by Authorized User",id:"questions-by-authorized-user",level:3},{value:"Questions by Unauthorized User",id:"questions-by-unauthorized-user",level:3},{value:"Prompt Governance",id:"prompt-governance",level:2}];function c(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"safe-retriever-for-langchain",children:"Safe Retriever for LangChain"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:(0,i.jsx)(n.strong,{children:"Identity-enabled RAG using PebbloRetrievalQA"})})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"PebbloRetrievalQA"})," is a Retrieval chain with Identity & Semantic Enforcement for question-answering against a vector database."]}),"\n",(0,i.jsx)(n.p,{children:"This document covers how to retrieve documents with Identity & Semantic Enforcement."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Steps:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Loading Documents with Authorization metadata:"})," The process starts by loading documents with option to pull additional authorization metadata turned on. See supported loader specific documentation for exact input field (typically ",(0,i.jsx)(n.code,{children:"load_auth=True"}),"),"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Using supported Vector database"})," ",(0,i.jsx)(n.code,{children:"PebbloRetrievalQA"})," chain requires a Vector database that supports rich metadata filtering capability. Pick one from the supported Vector database vendor list shown below in this document."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Initializing PebbloRetrievalQA Chain:"}),"  After loading the documents, the PebbloRetrievalQA chain is initialized. This chain uses the retriever (\ncreated from the vector database) and an LLM."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"The 'ask' Function:"}),"  The 'ask' function is used to pose questions to the system. This function accepts a question and an auth_context as input\nand returns the answer using the PebbloRetrievalQA chain. The auth_context contains the identity and authorization groups of the user accessing the\napplication."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Posing Questions:"})," Finally, questions are posed to the system. The system retrieves answers based on the authorization metadata in the documents\nand the auth_context provided in the 'ask' function."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"setup",children:"Setup"}),"\n",(0,i.jsx)(n.h3,{id:"dependencies",children:"Dependencies"}),"\n",(0,i.jsx)(n.p,{children:"The walkthrough requires Langchain, langchain-community, langchain-openai, and a Qdrant client."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"%pip install --upgrade --quiet  langchain langchain-community langchain-openai qdrant_client\n"})}),"\n",(0,i.jsx)(n.h3,{id:"identity-aware-data-ingestion",children:"Identity-aware Data Ingestion"}),"\n",(0,i.jsx)(n.p,{children:"In this scenario, Qdrant is being utilized as a vector database. However, the flexibility of the system allows for the use of any supported vector\ndatabases."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"PebbloRetrievalQA chain supports the following vector databases:"})}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Qdrant"}),"\n",(0,i.jsx)(n.li,{children:"Pinecone"}),"\n",(0,i.jsx)(n.li,{children:"Postgres(utilizing the pgvector extension)"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Load vector database with authorization information in metadata:"})}),"\n",(0,i.jsxs)(n.p,{children:["In this phase, the authorization details of the original document are captured and stored in the ",(0,i.jsx)(n.code,{children:"authorized_identities"})," field within the metadata of\neach chunk in the VectorDB entry."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.em,{children:["It's important to note that to use the PebbloRetrievalQA chain, authorization metadata must always be placed in the ",(0,i.jsx)(n.code,{children:"authorized_identities"}),"\nfield."]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from langchain_community.vectorstores.qdrant import Qdrant\nfrom langchain_core.documents import Document\nfrom langchain_openai.embeddings import OpenAIEmbeddings\nfrom langchain_openai.llms import OpenAI\n\nllm = OpenAI()\nembeddings = OpenAIEmbeddings()\ncollection_name = "pebblo-identity-rag"\n\npage_content = """\nPerformance Report: John Smith\nEmployee Information:\n    \u2022Name: John Smith\n    \u2022Employee ID: JS12345\n    \u2022Department: Sales\n    \u2022Position: Sales Representative\n    \u2022Review Period: January 1, 2023 - December 31, 2023\n\nPerformance Summary: \nJohn Smith has demonstrated commendable performance as a Sales Representative during the review period. \nHe consistently met and often exceeded sales targets, contributing signi\ufb01cantly to the department\'s success. \nHis dedication, professionalism, and collaborative approach have been instrumental in fostering positive \nrelationships with clients and colleagues alike.\n\nKey Achievements:\n\u2022Exceeded sales targets by 20% for the \ufb01scal year, demonstrating exceptional sales acumen and strategic planning skills.\n\u2022Successfully negotiated several high-value contracts, resulting in increased revenue and client satisfaction.\n\u2022Proactively identi\ufb01ed opportunities for process improvement within the sales team, \n    leading to streamlined work\ufb02ows and enhanced ef\ufb01ciency.\n\u2022Received positive feedback from clients and colleagues for excellent communication skills, responsiveness, and customer service.\n    Areas for Development: While John\'s performance has been exemplary overall, \nthere are opportunities for further development in certain areas:\n\u2022Continued focus on expanding product knowledge to better address client needs and provide tailored solutions.\n\u2022Enhancing time management skills to prioritize tasks effectively and maximize productivity during busy periods.\n\u2022Further development of leadership abilities to support and mentor junior team members within the sales department.\n\nConclusion: In conclusion, John Smith has delivered outstanding results as a Sales Representative at ACME Corp. \nHis dedication, performance, and commitment to excellence re\ufb02ect positively on the organization." \n"""\n\ndocuments = [\n    Document(\n        **{\n            "page_content": page_content,\n            "metadata": {\n                "authorized_identities": ["hr-support", "hr-leadership"],\n                "page": 0,\n                "source": "https://drive.google.com/file/d/xxxxxxxxxxxxx/view",\n                "title": "Performance Report- John Smith.pdf",\n            },\n        }\n    )\n]\n\nprint("Loading vectordb...")\n\nvectordb = Qdrant.from_documents(\n    documents,\n    embeddings,\n    location=":memory:",\n    collection_name=collection_name,\n)\n\nprint("Vectordb loaded.")\n'})}),"\n",(0,i.jsx)(n.h2,{id:"retrieval-with-identity--semantic-enforcement",children:"Retrieval with Identity & Semantic Enforcement"}),"\n",(0,i.jsxs)(n.p,{children:["PebbloRetrievalQA chain uses a SafeRetrieval to enforce that the snippets used for in-context are retrieved\nonly from the documents authorized for the user.\nTo achieve this, the Gen-AI application needs to provide an authorization context for this retrieval chain.\nThis ",(0,i.jsx)(n.code,{children:"auth_context"})," should be filled with the identity and authorization groups of the user accessing the Gen-AI app."]}),"\n",(0,i.jsxs)(n.p,{children:["Here is the sample code for the PebbloRetrievalQA with ",(0,i.jsx)(n.code,{children:"authorized_identities"})," from the user accessing the RAG\napplication, passed in ",(0,i.jsx)(n.code,{children:"auth_context"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from langchain_community.chains import PebbloRetrievalQA\nfrom langchain_community.chains.pebblo_retrieval.models import AuthContext, ChainInput\n\n# Initialize PebbloRetrievalQA chain\nqa_chain = PebbloRetrievalQA.from_chain_type(\n    llm=llm,\n    app_name="pebblo-identity-and-semantic-retriever",\n    owner="Joe Smith",\n    description="Identity and Semantic filtering using PebbloSafeLoader, and PebbloRetrievalQA",\n    chain_type="stuff",\n    retriever=vectordb.as_retriever(),\n    verbose=True,\n)\n\ndef ask(question: str, auth_context: dict):\n    """\n    Ask a question to the PebbloRetrievalQA chain\n    """\n    auth_context_obj = AuthContext(**auth_context) if auth_context else None\n    chain_input_obj = ChainInput(query=question, auth_context=auth_context_obj)\n    return qa_chain.invoke(chain_input_obj.dict())\n'})}),"\n",(0,i.jsx)(n.h3,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsx)(n.p,{children:"PebbloRetrievalQA takes the following parameters:"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Parameter"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Type"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"llm"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"BaseLanguageModel"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Langchain LLM instance."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"app_name"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"str"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Name of the application; should be unique across the loader and retriever applications."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"owner"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"str"}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["(",(0,i.jsx)(n.strong,{children:"Optional"}),", Default: None) Owner of the application."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"description"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"str"}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["(",(0,i.jsx)(n.strong,{children:"Optional"}),", Default: None) Description of the application."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"chain_type"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"str"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:'Type of document combining chain to use. Should be one of "stuff", "map_reduce", "map_rerank", and "refine".'})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"retriever"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"VectorStoreRetriever"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Vector database retriever."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"verbose"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"bool"}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["(",(0,i.jsx)(n.strong,{children:"Optional"}),", Default: False) Whether chains should be run in verbose mode or not."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"api_key"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"str"}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["(",(0,i.jsx)(n.strong,{children:"Optional"}),", Default: None) API Key for Pebblo Cloud; if not provided, PebbloRetrievalQA will look for ",(0,i.jsx)(n.code,{children:"PEBBLO_API_KEY"})," in the environment. If found, retrieval data will be sent to Pebblo Cloud."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"classifier_url"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"str"}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["(",(0,i.jsx)(n.strong,{children:"Optional"}),", Default: ",(0,i.jsx)(n.a,{href:"http://localhost:8000",children:"http://localhost:8000"}),") URL of the Pebblo Classifier Server. For more details on configuring the server URL, see ",(0,i.jsx)(n.a,{href:"https://daxa-ai.github.io/pebblo/config#server",children:"Pebblo Server Configuration"}),"."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"classifier_location"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"str"}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["(",(0,i.jsx)(n.strong,{children:"Optional"}),", Default: local) Location of the classifier, 'local' or 'pebblo-cloud'."]})]})]})]}),"\n",(0,i.jsxs)(n.p,{children:["* ",(0,i.jsxs)(n.em,{children:["In addition to the above-mentioned parameters, ",(0,i.jsx)(n.code,{children:"PebbloRetrievalQA"})," also supports the keyword arguments that are supported by the ",(0,i.jsx)(n.a,{href:"https://python.langchain.com/api_reference/langchain/chains/langchain.chains.base.Chain.html#langchain.chains.base.Chain",children:"Langchain Chain class"}),"."]})]}),"\n",(0,i.jsx)(n.h3,{id:"questions-by-authorized-user",children:"Questions by Authorized User"}),"\n",(0,i.jsx)(n.p,{children:'Data has been ingested for the authorized identities ["hr-support", "hr-leadership"].\nTherefore, a user who belongs to the "hr-support" authorized identity or group should be able to receive the correct answer.'}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'auth = {\n    "user_id": "hr-user@acme.org",\n    "authorized_identities": [\n        "hr-support",\n    ]\n}\n\nquestion = "Please share the performance report for John Smith?"\nresp = ask(question, auth)\nprint(f"Question: {question}\\n\\nAnswer: {resp[\'result\']}\\n")\n'})}),"\n",(0,i.jsx)(n.p,{children:"Output:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"Question: Please share the performance summary for John Smith?\n\nAnswer: \nJohn Smith has demonstrated commendable performance as a Sales Representative during the review period. \nHe consistently met and often exceeded sales targets, contributing signi\ufb01cantly to the department's success. \nHis dedication, professionalism, and collaborative approach have been instrumental in fostering positive \nrelationships with clients and colleagues alike.\n"})}),"\n",(0,i.jsx)(n.h3,{id:"questions-by-unauthorized-user",children:"Questions by Unauthorized User"}),"\n",(0,i.jsx)(n.p,{children:'Since the user\'s authorized identity/group "eng-support" is not included in the authorized identities ["hr-support", "hr-leadership"], they should not\nexpect to receive an answer.'}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'auth = {\n    "user_id": "eng-user@acme.org",\n    "authorized_identities": [\n        "eng-support",\n    ]\n}\n\nquestion = "Please share the performance report for John Smith?"\nresp = ask(question, auth)\nprint(f"Question: {question}\\n\\nAnswer: {resp[\'result\']}\\n")\n'})}),"\n",(0,i.jsx)(n.p,{children:"Output:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"Question: Please share the performance summary for John Smith?\n\nAnswer: \nI don't know, I'm sorry.\n"})}),"\n",(0,i.jsx)(n.h2,{id:"prompt-governance",children:"Prompt Governance"}),"\n",(0,i.jsx)(n.p,{children:"When a user sends any prompt to the LLM using PebbloRetrieveQA, Pebblo captures the findings from that prompt. This behavior is enabled by default."}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.em,{children:(0,i.jsx)(n.strong,{children:"Coming Soon"})}),": Ability to block or anonymize prompts based on policy."]}),"\n",(0,i.jsx)("img",{referrerpolicy:"no-referrer-when-downgrade",src:"https://static.scarf.sh/a.png?x-pxid=fd3b5c16-cba2-4212-87b2-9b9a9bea9ee1"})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>o});var i=t(6540);const r={},s=i.createContext(r);function a(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);
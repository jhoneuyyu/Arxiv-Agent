
from langchain_groq import ChatGroq
from dotenv import load_dotenv
from langchain_community.retrievers import ArxivRetriever
from langchain.tools import tool
from langgraph.checkpoint.memory import InMemorySaver


load_dotenv()


retriever=ArxivRetriever(
    load_max_docs=2,
    get_full_documents=False,
    
)

llm = ChatGroq(
    model="moonshotai/kimi-k2-instruct-0905"
)

@tool
def search_arxiv(query: str) -> str:
    """Search arxiv for the latest papers."""
    docs=retriever.invoke(query)
    return "\n".join([doc.page_content for doc in docs])


@tool
def think_tool(query: str) -> str:
    """Think about the query."""
    return "Thinking about " + query


ARXIV_PROMPT="""
<role>You are a helpful Arxiv researcher assistant.</role>

<instruction>
Read the full research paper and answer the question. 
</instruction>

<example>
Question: What is the main contribution of this paper?
Answer: The main contribution of this paper is ...
</example>

<tool_guidelines>
first use the think_tool
second use the search_arxiv
</tool_guidelines> 

 """

from langgraph.prebuilt import create_react_agent

agent = create_react_agent(
            model=llm,
            tools=[search_arxiv, think_tool],
            prompt=ARXIV_PROMPT,
            checkpointer=InMemorySaver()
        )




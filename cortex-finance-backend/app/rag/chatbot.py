from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


def ask_question(query):

    db = FAISS.load_local(
        "vector_store",
        embedding_model,
        allow_dangerous_deserialization=True
    )

    docs = db.similarity_search(query, k=3)

    context = "\n".join(
        [doc.page_content for doc in docs]
    )

    return f"""
Relevant Transactions:

{context}

User Question:
{query}
"""
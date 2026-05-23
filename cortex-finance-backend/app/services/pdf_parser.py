import pdfplumber
import pandas as pd


def extract_transactions(pdf_path):

    transactions = []

    with pdfplumber.open(pdf_path) as pdf:

        for page in pdf.pages:

            text = page.extract_text()

            if text:
                lines = text.split("\n")

                for line in lines:

                    parts = line.split()

                    if len(parts) >= 5:

                        transactions.append({
                            "raw": line
                        })

    return transactions
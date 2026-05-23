import pdfplumber
import re
import pandas as pd
from dateutil import parser


def clean_amount(amount):

    amount = amount.replace(",", "").strip()

    try:
        return float(amount)
    except:
        return 0


def normalize_date(date_text):

    try:
        return parser.parse(date_text, dayfirst=True).strftime("%Y-%m-%d")
    except:
        return date_text


def is_transaction_line(line):

    pattern = r"\d{2}[/-]\d{2}[/-]\d{2,4}"

    return re.search(pattern, line)


def parse_transaction_line(line):

    try:

        # Split line
        parts = line.split()

        # Date
        date = parts[0]

        # Amounts usually at end
        balance = clean_amount(parts[-1])

        debit = 0
        credit = 0

        amount = clean_amount(parts[-2])

        # Narration
        narration = " ".join(parts[1:-2])

        # Simple debit/credit logic
        if "cr" in line.lower():
            credit = amount
        else:
            debit = amount

        return {
            "date": normalize_date(date),
            "narration": narration,
            "debit": debit,
            "credit": credit,
            "balance": balance
        }

    except Exception as e:

        print("Parsing Error:", e)

        return None


def extract_transactions(pdf_path):

    transactions = []

    with pdfplumber.open(pdf_path) as pdf:

        for page in pdf.pages:

            text = page.extract_text()

            if not text:
                continue

            lines = text.split("\n")

            for line in lines:

                if is_transaction_line(line):

                    transaction = parse_transaction_line(line)

                    if transaction:
                        transactions.append(transaction)

    return transactions
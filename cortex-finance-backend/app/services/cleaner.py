from datetime import datetime


def normalize_date(date_string):

    try:
        return datetime.strptime(
            date_string,
            "%d/%m/%Y"
        ).strftime("%Y-%m-%d")

    except:
        return date_string


def clean_amount(amount):

    try:
        return float(
            amount.replace(",", "")
        )

    except:
        return 0
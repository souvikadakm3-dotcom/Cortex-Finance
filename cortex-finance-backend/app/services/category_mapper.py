CATEGORY_MAP = {

    "swiggy": "Food",
    "zomato": "Food",

    "uber": "Travel",
    "ola": "Travel",

    "amazon": "Shopping",
    "flipkart": "Shopping",

    "netflix": "Subscription",
    "spotify": "Subscription",

    "salary": "Income"
}


def categorize_transaction(narration):

    narration = narration.lower()

    for keyword, category in CATEGORY_MAP.items():

        if keyword in narration:
            return category

    return "Others"
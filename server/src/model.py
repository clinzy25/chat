# pylint: disable=missing-function-docstring

def query_get_messages(doc_ref):
    docs = doc_ref.order_by("createTs").get()
    initial_messages = []
    for doc in docs:
        initial_messages.append(doc.to_dict())

    return initial_messages

def query_add_message(doc_ref, msg):
    doc_ref.add(msg)

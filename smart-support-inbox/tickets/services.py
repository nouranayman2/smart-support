import re

CATEGORY_KEYWORDS = {

    "Billing" : ["billing", "payment", "refund", "card", "invoice", "subscription"],
    "Bug" : ["bug", "error", "crash", "not working", "exception"],
    "Feature" : ["feature request", "add feature", "enhancing feature"],
    "Account" : ["account", "sign in", "log in", "password", "verify"],


}

PRIORITY_KEYWORDS = {

    "High" : ["urgent", "asap", "now", "immediately"],
    "Medium" : ["as soon as possible", "pending", "waiting", "issue"],
}

def _clean_text( text : str) -> str :
    return re.sub( r"\s+", " ", (text or "").lower()).strip()

def ticket_analysis(subject: str, message: str) -> dict:
    text = _clean_text(f"{subject}, {message}")

    category = "Other"

    for category_name, keywords in CATEGORY_KEYWORDS.items() :
      for keyword in keywords :
        if keyword in text :
            category = category_name
            break
      if category != "Other" :
          break
        
        
      
     
    
    priority = "Low"

    for priority_name, keywords in PRIORITY_KEYWORDS.items() :
       for keyword in keywords :
          if keyword in text :
             priority = priority_name
             break
       if priority != "Low":
         break
       

    message_clean = _clean_text(message)
    summary = (message_clean[:200] + "...") if len(message_clean) > 200 else message_clean



    if category == "Billing":
        reply = ("Thank you for reaching out, we will see what the problem is.")
        
    elif category == "Bug":
        reply = ("Sorry for this error will be resolved soon, Thank you for informing us")
        
    elif category == "Feature":
        reply = ("Thank you for your suggestion, We will apply the enhancement")
               
    elif category == "Account":
        reply = ("Please confirm your email")

    else:
        reply = (
            "Thanks for reaching out, We will get back to you as soon as poosible.")

    return {
        "category": category,
        "priority": priority,
        "summary": summary,
        "suggested_reply": reply,
    }
            
      

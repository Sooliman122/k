import cohere
import requests

url = "https://api.cohere.com/v1/check-api-key"

headers = {
    "accept": "application/json",
    "authorization": "Bearer dfBCxBhZiQSp8unNq33cKAf0xE4XjT4ZVS74E8iM"
}

co = cohere.Client(api_key="dfBCxBhZiQSp8unNq33cKAf0xE4XjT4ZVS74E8iM")

response = co.chat(
    model="command-r-plus",
    message="Write a title for a blog post about API design. Only output the title text."
)

# "The Art of API Design: Crafting Elegant and Powerful Interfaces"


print(response)


function getBotResponse(input) {
   
    if (input == "How are you?") {
        return "Pretty good, what about you?";
    } else if (input == "Hi assistant") {
        return "Hello, nice to meet you!";
    } else if (input == "Good morning!") {
        return "Good morning!";
    }

    if (input == "hello") {
        return "Hello there!";
    } else if (input == "goodbye") {
        return "Talk to you later!";
    } 

    if (input == "What is the best Roland Product?") {
        return "AIRA Compact";
    } else if (input == "Shipping to?") {
        return "All over the world!";
    } else {
        return "Try asking something else!";
    }

}

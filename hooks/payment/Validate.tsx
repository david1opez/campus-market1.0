const Validate = (paymentMethod: "Oxxo" | "Card", name?: string) => {
    if(paymentMethod == "Oxxo") {
        if(!name) {
            alert("Parece que dejaste algunos campos vacíos")
            return false
        }
    }

    return true;
}

export default Validate;
import { dbank_backend } from "../../declarations/dbank_backend";

const balanceValue = document.getElementById("value");
const form = document.querySelector('form');
const input = document.getElementById("input-amount");
const output = document.getElementById("withdrawal-amount");

window.addEventListener("load", async () => {
    await update();
})

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const button = e.target.querySelector("#submit-btn");

    const inputAmount = input.value;
    const outputAmount = output.value;
    
    button.setAttribute("disabled", true);

    console.log(inputAmount.length, outputAmount.length);
    
    if(inputAmount.length) 
        await dbank_backend.topUp(parseFloat(inputAmount));
    
    if(outputAmount.length)
        await dbank_backend.takeOut(parseFloat(outputAmount));

    await dbank_backend.compound();

    await update();

    button.removeAttribute("disabled");
    input.value = "";
    output.value = "";
})

async function update() {
    const currentAmount = await dbank_backend.checkBalance();
    balanceValue.innerText = currentAmount.toFixed(2);
}

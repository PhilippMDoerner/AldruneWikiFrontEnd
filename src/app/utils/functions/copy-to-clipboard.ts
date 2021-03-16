export function copyToClipboard(text : string){
    //Store previously selected range of elements to restore it later
    var userSelectedTextRange: Range;
    if(userHasElementsSelected()){
         userSelectedTextRange = document.getSelection().getRangeAt(0);
         //remove the current selection
         window.getSelection().removeRange(userSelectedTextRange);
    }

    //Append an HTML Element with the text you want to copy to the body and select it
    const textContainerElement = createTextContainerElement(text);
    document.body.appendChild(textContainerElement);
    const copyRange: Range = selectElement(textContainerElement);

    copyCurrentSelection();

    //remove the selection range (Chrome throws a warning if we don't.) and HTML element
    console.log(copyRange);
    console.log(textContainerElement);
    console.log(textContainerElement.textContent);
    window.getSelection().removeRange(copyRange);
    document.body.removeChild(textContainerElement);

    //re-select what the user had previously selected
    if(userSelectedTextRange){
         window.getSelection().addRange(userSelectedTextRange);
    }
}

function userHasElementsSelected(): boolean{
    return document.getSelection().rangeCount > 0;
}

function createTextContainerElement(text: string): HTMLElement{
    const textContainerElement : HTMLElement = document.createElement('div');
    textContainerElement.innerHTML = text;
    const temp: any = textContainerElement.textContent; //Necessary as typescript hasn't caught up with browser having implemented replaceAll and thus throws a compiler error unnecessarily
    textContainerElement.innerHTML = temp.replaceAll(">", "<br\>> ").slice("<br\>".length);

    //set the position to be absolute and off the screen
    textContainerElement.style.position = 'absolute';
    textContainerElement.style.left = '-9999px';
    return textContainerElement
}

function selectElement(element: HTMLElement): Range{
    const selectedRange: Range = document.createRange();
    selectedRange.selectNode(element);
    window.getSelection().addRange(selectedRange);
    return selectedRange;
}

function copyCurrentSelection() : void{
    try{
        document.execCommand('copy');
    } catch(err) {
        window.alert("Your Browser Doesn't support this! Error : " + err);
    }
}
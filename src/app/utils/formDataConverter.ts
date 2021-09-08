export function convertSingleFileModelToFormData(model: any, fileAttributeName: string = "file"): FormData{
    if (!model.hasOwnProperty(fileAttributeName)) throw `Can't convert object to FormData! Your model does not have a ${fileAttributeName} property!`;
    if (!model[fileAttributeName][0]) throw `Can't convert object to FormData! Your model's ${fileAttributeName} has no file!`;

    const formData = new FormData();
    for ( var key in model ){
        if (key === fileAttributeName){
            formData.append(key, model[fileAttributeName][0]);
        } else if (model[key]){
            formData.append(key, model[key]);
        }
    }
    return formData;
}

export function convertMultiFileModelToFormData(model: any, fileAttributeNames: string[]): FormData{
    fileAttributeNames.forEach((name: string) => {
        if (!model.hasOwnProperty(name)) throw `Can't convert object to FormData! Your model does not have a ${name} property!`;
    });

    const formData = new FormData();
    for ( var key in model ){
        if (fileAttributeNames.includes(key)){
            formData.append(key, model[key][0]);
        } else if (model[key]){
            formData.append(key, model[key]);
        }
    }
    return formData;
}
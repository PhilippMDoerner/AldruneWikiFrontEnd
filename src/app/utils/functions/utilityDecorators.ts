import { Constants } from "src/app/app.constants";
  
export function onlyOnTouchDevices(target: any, propertyKey: string, descriptor: PropertyDescriptor){
  const originalMethod = descriptor.value;
  console.log(Constants.isTouchDevice);
  descriptor.value = function(){
      if (!Constants.isTouchDevice) return;

      return originalMethod.apply(this, arguments);
  }

  return descriptor;
}


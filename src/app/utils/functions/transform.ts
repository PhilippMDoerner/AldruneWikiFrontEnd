import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function transformObservableArrayContent(observable: Observable<any>, ObjectClass: any): Observable<any>{
    return observable.pipe(map(contentArray => {
        const newContent: typeof ObjectClass[] = [];
        for(let item of contentArray){
            newContent.push(new ObjectClass(item));
        }
        return newContent;
      }));
}

export function transformObservableContent(observable: Observable<any>, ObjectClass: any): Observable<any>{
    return observable.pipe(map(content => {
        return new ObjectClass(content);
    }))
}

export function TransformObservable(modelClass: any){
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){

        const originalMethod = descriptor.value;
        descriptor.value = function(){
            const observable = originalMethod.apply(this, arguments);
            return transformObservableContent(observable, modelClass);
        }
        return descriptor;
    }
}

export function TransformArrayObservable(modelClass: any){
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){

        const originalMethod = descriptor.value;
        descriptor.value = function(){
            const observable = originalMethod.apply(this, arguments);
            return transformObservableArrayContent(observable, modelClass);
        }
        return descriptor;
    }
}
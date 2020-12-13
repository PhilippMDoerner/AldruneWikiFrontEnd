import { Pipe, PipeTransform } from '@angular/core';
import { last } from 'lodash';
import { DiaryEntry } from 'src/app/models/diaryentry';
import { Quest } from 'src/app/models/quest';

@Pipe({name: "groupBy"}) 
export class GroupByPipe implements PipeTransform{
    transform(itemArray: Array<any>, field: string): any{
        const callback = (accumulator: any, item: any) => {
            const groupedFieldValue =  this.getFieldValue(field, item);
            if (accumulator.hasOwnProperty(groupedFieldValue)) accumulator[groupedFieldValue].push(item);
            else accumulator[groupedFieldValue] = [item];
            return accumulator;
        }
        const groupedObj = itemArray.reduce(callback, {});
        return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
    }

    getFieldValue(field: string, item: object): any{
        /**Returns the field of a given item, even if it is nested within it */
        const keys: string[] = field.split(".");

        let currentValue: any = item;
        for (let key of keys){
            currentValue = currentValue[key];
        }

        return currentValue;
    }
}

@Pipe({name: "groupByFirstLetter"})
export class GroupByFirstLetterPipe implements PipeTransform{
    transform(itemArray: Array<any>, field: string): any{
        const callback = (accumulator, item) => {
            const groupedFieldValue: string = item[field];
            const firstLetter: string = groupedFieldValue[0];
            if(accumulator.hasOwnProperty(firstLetter)) accumulator[firstLetter].push(item);
            else accumulator[firstLetter] = [item];
            return accumulator;
        }
        const groupedObj = itemArray.reduce(callback, {});
        return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
    }
}

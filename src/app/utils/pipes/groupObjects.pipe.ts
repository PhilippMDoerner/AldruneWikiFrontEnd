import { Pipe, PipeTransform } from '@angular/core';
import { DiaryEntry } from 'src/app/models/diaryentry';

@Pipe({name: "groupBy"}) 
export class GroupByPipe implements PipeTransform{
    transform(itemArray: Array<any>, field: string): any{
        const callback = (accumulator, item) => {
            const groupedFieldValue = item[field];
            if (accumulator.hasOwnProperty(groupedFieldValue)) accumulator[groupedFieldValue].push(item);
            else accumulator[groupedFieldValue] = [item];
            return accumulator;
        }
        const groupedObj = itemArray.reduce(callback, {});
        return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
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

// const initialValue = {};
// const callback = (accumulator, diaryEntry) => {
//     const currentAuthor = diaryEntry['author'];
//     if (accumulator.hasOwnProperty(currentAuthor)) accumulator[currentAuthor].push(diaryEntry);
//     else accumulator[currentAuthor] = [diaryEntry];
//     return accumulator;
// }
// diaryEntries.reduce(callback, initialValue)

// const diaryEntries = [
//     {
//         "name": "Diary Entry #14",
//         "pk": 18,
//         "name_full": "Diary Entry #14- Expedition 1 for the stolen lance of Lancelot",
//         "author": "isofruit"
//     },
//     {
//         "name": "Diary Entry #14",
//         "pk": 31,
//         "name_full": "Diary Entry #14- The Act of Companionship",
//         "author": "Caitriona"
//     },
//     {
//         "name": "Diary Entry #20",
//         "pk": 28,
//         "name_full": "Diary Entry #20- Final Journal Away",
//         "author": "Fen"
//     },
//     {
//         "name": "Diary Entry #16",
//         "pk": 23,
//         "name_full": "Diary Entry #16- Harrenwich",
//         "author": "Fen"
//     },
//     {
//         "name": "Diary Entry #15",
//         "pk": 20,
//         "name_full": "Diary Entry #15- None",
//         "author": "Fen"
//     },
//     {
//         "name": "Diary Entry #13",
//         "pk": 16,
//         "name_full": "Diary Entry #13- None",
//         "author": "Fen"
//     },
//     {
//         "name": "Diary Entry #12",
//         "pk": 14,
//         "name_full": "Diary Entry #12- None",
//         "author": "Fen"
//     },
//     {
//         "name": "Diary Entry #10",
//         "pk": 11,
//         "name_full": "Diary Entry #10- None",
//         "author": "Fen"
//     },
//     {
//         "name": "Diary Entry #23",
//         "pk": 32,
//         "name_full": "Diary Entry #23- The siege on Hinnel Thread",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry #22",
//         "pk": 30,
//         "name_full": "Diary Entry #22- Preparing for Hinnel Thread",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry #21",
//         "pk": 29,
//         "name_full": "Diary Entry #21- Freeing a world serpent",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry #20",
//         "pk": 27,
//         "name_full": "Diary Entry #20- Saran's Temple",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry #19",
//         "pk": 26,
//         "name_full": "Diary Entry #19- Murtagh's nightmare",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry #18",
//         "pk": 25,
//         "name_full": "Diary Entry #18- The tournaments and going to sea",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry #17",
//         "pk": 24,
//         "name_full": "Diary Entry #17- The Royal Ball Part 2",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry #16",
//         "pk": 21,
//         "name_full": "Diary Entry #16- The Royal Ball Part 1",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry #15",
//         "pk": 19,
//         "name_full": "Diary Entry #15- Caitriona's Prey and arrival at Etruscan",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry #14",
//         "pk": 17,
//         "name_full": "Diary Entry #14- From Loom Arrow to Trent",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry #13",
//         "pk": 15,
//         "name_full": "Diary Entry #13- Preparing for Travel and Funding an Expedition",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry #12",
//         "pk": 13,
//         "name_full": "Diary Entry #12- Ending the Ranger Investigation and The Firbolg Sword",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry #11",
//         "pk": 12,
//         "name_full": "Diary Entry #11- Enter Mordred Blackfeather and the Ranger Investigation",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry #10",
//         "pk": 10,
//         "name_full": "Diary Entry #10- The Woad Wolf's Trial",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry # 9",
//         "pk": 9,
//         "name_full": "Diary Entry # 9- The Chaos Gryffon",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry # 8",
//         "pk": 1,
//         "name_full": "Diary Entry # 8- Exploring Loom Arrow and Job Offers",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry # 7",
//         "pk": 2,
//         "name_full": "Diary Entry # 7- Naeron's Defeat and the arrival in Loom Arrow",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry # 6",
//         "pk": 3,
//         "name_full": "Diary Entry # 6- Aliana Sterent and the way to Loom Arrow",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry # 5",
//         "pk": 4,
//         "name_full": "Diary Entry # 5- From Orc Hollow to Hallan",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry # 4",
//         "pk": 5,
//         "name_full": "Diary Entry # 4- The dead of Orc Hollow",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry # 3",
//         "pk": 6,
//         "name_full": "Diary Entry # 3- Fleeing the razed village",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry # 2",
//         "pk": 7,
//         "name_full": "Diary Entry # 2- Amara Walsh and the Dwarven Fortress",
//         "author": "Relentless"
//     },
//     {
//         "name": "Diary Entry # 1",
//         "pk": 8,
//         "name_full": "Diary Entry # 1- Investigating Amara Walsh",
//         "author": "Relentless"
//     }
// ]
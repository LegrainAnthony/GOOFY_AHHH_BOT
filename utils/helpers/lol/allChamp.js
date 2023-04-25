import championsDatas from '../../../data/rawData/champions.json' assert {type: 'json'}

export default function getAllNamesChamps() {
    let nameChamps = [];
    for (const champ in championsDatas.data) {
        nameChamps.push(champ);
    }
    return nameChamps;
}
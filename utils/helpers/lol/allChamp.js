import championsDatas from '../../../data/rawData/champions.json' assert {type: 'json'}

const getAllNamesChamps = () => {
    const nameChamps = []; 
    for (const champ in championsDatas.data) {
     nameChamps.push(champ);
    }
    return nameChamps
}

export default getAllNamesChamps;
import { Inventory } from './inventory.js';

export const Builds = (() => {
    let builds = JSON.parse(localStorage.getItem('builds')) || [];
    const container = document.getElementById('buildsContainer');

    const save = () => localStorage.setItem('builds', JSON.stringify(builds));

    const render = () => {
        container.innerHTML = '';
        builds.forEach(b=>{
            const div = document.createElement('div');
            div.className='card';
            div.innerHTML=`<h3>${b.name}</h3>
                <p>Teile: ${b.parts.map(p=>p.name).join(', ')}</p>
                <p>Gewinn/Verlust: ${calculateProfit(b)}€</p>
                <button onclick="Builds.edit(${b.id})">Bearbeiten</button>
                <button onclick="Builds.delete(${b.id})">Löschen</button>`;
            container.appendChild(div);
        });
    };

    const calculateProfit = (build) => {
        return build.parts.reduce((acc,p)=>acc+(p.sellPrice?p.sellPrice-p.price:0),0);
    };

    const add = () => {
        const name = prompt('Name des Builds:');
        if(!name) return;
        const selectedParts = [];
        let partId;
        while((partId = prompt('ID des Teils hinzufügen (Abbrechen zum Fertigstellen)'))){
            const part = JSON.parse(JSON.stringify(Inventory.parts.find(p=>p.id==partId)));
            if(part) selectedParts.push(part);
        }
        builds.push({ id: Date.now(), name, parts:selectedParts });
        save();
        render();
    };

    const edit = (id) => {
        const build = builds.find(b=>b.id===id);
        if(!build) return;
        build.name = prompt('Name:', build.name) || build.name;
        save();
        render();
    };

    const deleteBuild = (id) => {
        if(!confirm('Wirklich löschen?')) return;
        builds = builds.filter(b=>b.id!==id);
        save();
        render();
    };

    const init = () => {
        document.getElementById('addBuildBtn').addEventListener('click', add);
        render();
    };

    return { init, edit, delete: deleteBuild };
})();

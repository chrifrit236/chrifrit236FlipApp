import { Inventory } from './inventory.js';

export const Bundles = (() => {
    let bundles = JSON.parse(localStorage.getItem('bundles')) || [];
    const container = document.getElementById('bundlesContainer');

    const save = () => localStorage.setItem('bundles', JSON.stringify(bundles));

    const render = () => {
        container.innerHTML='';
        bundles.forEach(b=>{
            const div = document.createElement('div');
            div.className='card';
            const totalPrice = b.parts.reduce((acc,p)=>acc+p.price,0);
            div.innerHTML=`<h3>${b.name}</h3>
                <p>Teile: ${b.parts.map(p=>p.name).join(', ')}</p>
                <p>Gesamtpreis: ${totalPrice}€</p>
                <button onclick="Bundles.edit(${b.id})">Bearbeiten</button>
                <button onclick="Bundles.delete(${b.id})">Löschen</button>`;
            container.appendChild(div);
        });
    };

    const add = () => {
        const name = prompt('Name des Bundles:');
        if(!name) return;
        const selectedParts = [];
        let partId;
        while((partId = prompt('ID des Teils hinzufügen (Abbrechen zum Fertigstellen)'))){
            const part = JSON.parse(JSON.stringify(Inventory.parts.find(p=>p.id==partId)));
            if(part) selectedParts.push(part);
        }
        bundles.push({ id: Date.now(), name, parts:selectedParts });
        save();
        render();
    };

    const edit = (id) => {
        const bundle = bundles.find(b=>b.id===id);
        if(!bundle) return;
        bundle.name = prompt('Name:', bundle.name) || bundle.name;
        save();
        render();
    };

    const deleteBundle = (id) => {
        if(!confirm('Wirklich löschen?')) return;
        bundles = bundles.filter(b=>b.id!==id);
        save();
        render();
    };

    const init = () => {
        document.getElementById('addBundleBtn').addEventListener('click', add);
        render();
    };

    return { init, edit, delete: deleteBundle };
})();

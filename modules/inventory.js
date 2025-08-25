export const Inventory = (() => {
    let parts = JSON.parse(localStorage.getItem('parts')) || [];

    const container = document.getElementById('inventoryContainer');

    const save = () => localStorage.setItem('parts', JSON.stringify(parts));

    const render = (view='table') => {
        container.innerHTML = '';
        if(view==='table'){
            const table = document.createElement('table');
            table.innerHTML = `<tr>
                <th>Name</th><th>Kategorie</th><th>Marke</th><th>Preis</th><th>Zustand</th><th>Aktionen</th>
            </tr>`;
            parts.forEach(p=>{
                const row = document.createElement('tr');
                row.innerHTML = `<td>${p.name}</td><td>${p.category}</td><td>${p.brand}</td><td>${p.price}€</td><td>${p.condition}</td>
                    <td>
                        <button onclick="Inventory.edit(${p.id})">Bearbeiten</button>
                        <button onclick="Inventory.delete(${p.id})">Löschen</button>
                        <button onclick="Inventory.sell(${p.id})">Verkaufen</button>
                    </td>`;
                table.appendChild(row);
            });
            container.appendChild(table);
        } else {
            parts.forEach(p=>{
                const card = document.createElement('div');
                card.className='card';
                card.innerHTML=`<h3>${p.name}</h3>
                    <p>${p.category} | ${p.brand}</p>
                    <p>${p.price}€ | ${p.condition}</p>
                    <button onclick="Inventory.edit(${p.id})">Bearbeiten</button>
                    <button onclick="Inventory.delete(${p.id})">Löschen</button>
                    <button onclick="Inventory.sell(${p.id})">Verkaufen</button>`;
                container.appendChild(card);
            });
        }
    };

    const add = () => {
        const name = prompt('Name des Teils:');
        const category = prompt('Kategorie:');
        const brand = prompt('Marke:');
        const price = parseFloat(prompt('Preis:'));
        const condition = prompt('Zustand:');
        if(!name || !category || !brand || isNaN(price)) return;
        parts.push({ id: Date.now(), name, category, brand, price, condition });
        save();
        render();
    };

    const edit = (id) => {
        const p = parts.find(x=>x.id===id);
        if(!p) return;
        p.name = prompt('Name:', p.name) || p.name;
        p.category = prompt('Kategorie:', p.category) || p.category;
        p.brand = prompt('Marke:', p.brand) || p.brand;
        p.price = parseFloat(prompt('Preis:', p.price)) || p.price;
        p.condition = prompt('Zustand:', p.condition) || p.condition;
        save();
        render();
    };

    const deletePart = (id) => {
        if(!confirm('Wirklich löschen?')) return;
        parts = parts.filter(x=>x.id!==id);
        save();
        render();
    };

    const sell = (id) => {
        const p = parts.find(x=>x.id===id);
        if(!p) return;
        const sellPrice = parseFloat(prompt('Verkaufspreis:'));
        if(isNaN(sellPrice)) return;
        alert(`Gewinn/Verlust: ${sellPrice - p.price}€`);
        parts = parts.filter(x=>x.id!==id);
        save();
        render();
    };

    const init = () => {
        document.getElementById('addPartBtn').addEventListener('click', add);
        document.getElementById('viewMode').addEventListener('change', e=>render(e.target.value));
        render();
    };

    return { init, edit, delete: deletePart, sell };
})();

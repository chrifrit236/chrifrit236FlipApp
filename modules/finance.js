import { Inventory } from './inventory.js';
import { Builds } from './builds.js';
import { Bundles } from './bundles.js';

export const Finance = (() => {
    const container = document.getElementById('financeSummary');

    const render = () => {
        let totalProfit = 0;
        Inventory.parts.forEach(p=>{ if(p.sellPrice) totalProfit+=p.sellPrice-p.price; });
        // Build Profit
        if(Builds.builds) Builds.builds.forEach(b=>totalProfit+=b.parts.reduce((acc,p)=>acc+(p.sellPrice?p.sellPrice-p.price:0),0));
        // Bundle Profit
        if(Bundles.bundles) Bundles.bundles.forEach(b=>totalProfit+=b.parts.reduce((acc,p)=>acc+(p.sellPrice?p.sellPrice-p.price:0),0));
        container.innerHTML=`<p>Gesamtgewinn/Verlust: ${totalProfit}€</p>`;
    };

    const init = () => {
        render();
        setInterval(render,5000); // Aktualisierung alle 5 Sekunden
    };

    return { init };
})();

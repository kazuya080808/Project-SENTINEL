// content.js - Project SENTINEL Core Logic
function injectSentinel() {
    let assets = { gold: "---", silver: "---", platinum: "---" };

    // 1. DOM Scan Logic
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while(node = walker.nextNode()) {
        const txt = node.textContent.trim();
        if (node.parentElement.closest('#sbi-sentinel-display')) continue;

        // 特定の単位(g)を検知し、資産を抽出するロジック
        if (/[0-9,.]+\s*g/.test(txt)) {
            if (txt.includes('g')) { 
                // ここに具体的な判定ロジックを実装
                assets.gold = "Detected"; 
            }
        }
    }

    updateUI(assets);
}

function updateUI(data) {
    let div = document.getElementById('sbi-sentinel-display');
    if (!div) {
        div = document.createElement('div');
        div.id = 'sbi-sentinel-display';
        div.style = "position:fixed;top:80px;right:20px;z-index:2147483647;background:rgba(0,0,0,0.9);color:#0f0;padding:15px;font-family:monospace;border:3px solid #0f0;border-radius:10px;width:240px;pointer-events:none;";
        document.body.appendChild(div);
    }
    
    div.innerHTML = `
        <div style="font-size:10px;border-bottom:1px solid #333;margin-bottom:8px;padding-bottom:5px;">SENTINEL: MONITORING_MODE</div>
        <div style="margin-bottom:8px;"><span style="color:#ffd700;font-size:11px;">GOLD</span><br><span style="font-size:18px;color:#fff;">${data.gold}</span></div>
        <div style="margin-top:10px;font-size:9px;text-align:right;opacity:0.4;">STATUS: ACTIVE</div>
    `;
}

setInterval(injectSentinel, 2000);

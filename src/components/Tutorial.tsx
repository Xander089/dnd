import "./Tutorial.css";

export default function Tutorial() {
  return (
    <>
      <div className="header">
        <div className="header-container header-container-monsters">
          <h4 style={{ fontSize: "1.3rem", margin: "0", marginLeft: "1rem" }}>Tutorial</h4>
        </div>
      </div>
      <div className="tab tutorial-tab">
        <div className="tutorial-body">

          <section className="tutorial-section">
            <p className="tutorial-intro">
              Benvenuto nel <strong>D&D Combat Tracker</strong>, uno strumento per il Master per gestire i combattimenti a turni in modo rapido e ordinato.
              La barra a sinistra contiene cinque sezioni: <strong>Game</strong>, <strong>Party</strong>, <strong>Monsters</strong>, <strong>Grimoire</strong> e <strong>Tutorial</strong> (questa pagina). In basso si trova <strong>Settings</strong> per esportare o importare i dati.
            </p>
          </section>

          <section className="tutorial-section">
            <h2>1. Party — Crea i giocatori</h2>
            <p>Prima di tutto, aggiungi i personaggi del gruppo nella sezione <strong>Party</strong>.</p>
            <h3>Aggiungere un giocatore</h3>
            <ol>
              <li>Clicca <strong>Add</strong> nell'header.</li>
              <li>Compila i campi: <em>Name</em>, <em>HP</em>, <em>Max HP</em>, <em>Initiative</em> e i sei attributi.</li>
              <li>Clicca <strong>Add</strong> per confermare (disabilitato finché i campi obbligatori sono vuoti).</li>
            </ol>
            <p>Tutti i campi sono editabili direttamente nella card e si salvano automaticamente su <code>onBlur</code>. Il cestino elimina il giocatore in modo definitivo dopo conferma.</p>
            <h3>Includere un giocatore nel combattimento</h3>
            <p>Spunta il campo <strong>In Game</strong> nella card: il giocatore comparirà nella pagina Game.</p>
          </section>

          <section className="tutorial-section">
            <h2>2. Monsters — Crea le categorie</h2>
            <p>Qui non crei singoli mostri ma <strong>categorie</strong> (template) riutilizzabili — es. "Goblin", "Orco".</p>
            <h3>Campi base</h3>
            <p><em>Type</em> (nome), <em>HP / Max HP</em>, <em>Initiative Modifier</em>, i sei attributi.</p>
            <h3>Proprietà avanzate</h3>
            <p>Clicca <strong>▼</strong> sulla card per espanderle. Si dividono in:</p>
            <ul>
              <li><strong>Sempre visibili in combattimento:</strong> AC, Creature Type, Alignment, Special Traits, Actions.</li>
              <li><strong>Opzionali</strong> (visibili solo se compilate): CR, Prof. Bonus, EXP, Saving Throws, Senses, Abilities, Bonus/Legendary Actions, Reactions, Resistances, Vulnerabilities, Immunities.</li>
            </ul>
            <h3>Assegnare incantesimi</h3>
            <p>Nella sezione avanzata, cerca un incantesimo nella barra <strong>Spells</strong> e selezionalo. Appare come chip; clicca <strong>×</strong> per rimuoverlo.</p>
          </section>

          <section className="tutorial-section">
            <h2>3. Grimoire — Il database degli incantesimi</h2>
            <p>Crea una libreria di incantesimi da assegnare ai mostri.</p>
            <h3>Aggiungere un incantesimo</h3>
            <ol>
              <li>Clicca <strong>Add</strong>.</li>
              <li>Compila: <em>Name</em> ✱, <em>School</em> ✱, <em>Level</em>, <em>Cast Time</em> + <em>Cast Unit</em>, <em>Range</em>, <em>Duration</em> + <em>Dur. Unit</em>, <em>Effect</em> ✱.</li>
              <li>Clicca <strong>Add</strong>. (✱ = obbligatorio)</li>
            </ol>
            <p>I dropdown <strong>Cast Unit</strong> e <strong>Dur. Unit</strong> permettono di scegliere tra: <em>Actions, Bonus Actions, Reactions, Rounds, Minutes, Hours, Days</em>. Tutte le modifiche si salvano automaticamente.</p>
          </section>

          <section className="tutorial-section">
            <h2>4. Game — Il combattimento</h2>
            <h3>Avviare un combattimento</h3>
            <ol>
              <li>Attiva i giocatori con <strong>In Game ✓</strong> in Party.</li>
              <li>Vai in <strong>Game</strong>: i giocatori compaiono automaticamente.</li>
              <li>Clicca <strong>Monsters</strong> nell'header: seleziona le categorie, imposta la quantità e (opzionale) un valore di Initiative manuale.</li>
              <li>Clicca <strong>Ok</strong>: i mostri vengono aggiunti con nome automatico (es. "Goblin 1") e iniziativa assegnata.</li>
              <li>Usa <strong>Roll</strong> nell'header per applicare un roll manuale all'ordine di iniziativa.</li>
            </ol>
            <h3>La lista dei combattenti</h3>
            <p>Ogni card mostra <em>Name</em>, <em>HP</em> (rosso se = 0, giallo se &lt; 3), <em>Max HP</em>, <em>Initiative</em> e gli <em>Status</em> attivi. La card con il <strong>bordo evidenziato</strong> è quella del combattente attivo.</p>
            <h3>Avanzare di turno</h3>
            <p>Clicca la <strong>freccia →</strong> nell'HUD in basso. Il gioco passa al prossimo combattente e i suoi status vengono decrementati. Il contatore <em>Turn X – Step Y / Z</em> si aggiorna. Se necessario, clicca <strong>Edit</strong> per modificare turno e step manualmente.</p>
            <h3>Danno e cura</h3>
            <ul>
              <li><strong>Spada</strong> — apre la modale Damage: inserisci l'importo e clicca Ok. La card lampeggia di rosso.</li>
              <li><strong>Cuore</strong> — apre la modale Cure: inserisci l'importo e clicca Ok. La card lampeggia di verde.</li>
            </ul>
            <p>Se gli HP arrivano a 0, appare automaticamente la modale di rimozione.</p>
            <h3>Rimuovere un combattente</h3>
            <p>Clicca il <strong>cestino</strong> sulla card e conferma. I giocatori vengono disattivati (rimangono in Party); i mostri vengono eliminati e aggiunti al <strong>Defeated Log</strong> con tipo, nome ed EXP.</p>
            <h3>Dettagli del combattente</h3>
            <p>Clicca <strong>▼</strong> sulla card per espandere i sei attributi e, per i mostri, tutte le proprietà avanzate. Gli incantesimi assegnati compaiono come chip: passa il mouse sopra per vedere il tooltip completo (scuola, livello, tempo di lancio, gittata, durata, effetto).</p>
          </section>

          <section className="tutorial-section">
            <h2>5. Status delle condizioni</h2>
            <ul>
              <li>Clicca <strong>+</strong> nella colonna Status per aggiungere una condizione con nome e durata (turni).</li>
              <li>Clicca <strong>×</strong> per rimuoverla manualmente.</li>
              <li>Quando il turno <em>arriva</em> su un combattente, la durata di tutti i suoi status scende di 1. A 0 vengono rimossi automaticamente e compare una <strong>notifica toast</strong> (es. <em>"Goblin 1 has no more Poison"</em>).</li>
            </ul>
          </section>

          <section className="tutorial-section">
            <h2>6. Effetto Globale</h2>
            <p>Un effetto che si applica all'intero combattimento (es. "Oscurità", "Haste") per un certo numero di turni.</p>
            <ol>
              <li>Clicca <strong>Effect</strong> nell'header di Game.</li>
              <li>Inserisci il nome e la durata, poi clicca <strong>Ok</strong>.</li>
            </ol>
            <p>L'effetto compare nell'header con il conteggio dei turni rimanenti e scompare automaticamente a 0.</p>
          </section>

          <section className="tutorial-section">
            <h2>7. Pannello laterale</h2>
            <p>La <strong>freccia di espansione</strong> nell'header di Game mostra o nasconde il pannello con:</p>
            <ul>
              <li><strong>Note</strong> — area di testo libera per appunti del master, salvata automaticamente.</li>
              <li><strong>Defeated Log</strong> — lista dei mostri rimossi con tipo, nome ed EXP. Il pulsante <strong>×</strong> cancella il log.</li>
              <li><strong>History</strong> — log cronologico di tutte le azioni (turni, danni, cure, effetti, rimozioni). Il pulsante <strong>×</strong> cancella la cronologia.</li>
            </ul>
          </section>

          <section className="tutorial-section">
            <h2>8. Settings — Esporta e importa</h2>
            <p>Tutti i dati sono salvati in locale nel browser. L'icona <strong>ingranaggio</strong> in basso nella sidebar apre Settings.</p>
            <ul>
              <li><strong>Esporta:</strong> clicca <strong>Copy</strong> per copiare i dati negli appunti e incollali in un file di testo.</li>
              <li><strong>Importa:</strong> incolla una stringa esportata nella textarea e clicca <strong>Apply</strong>.</li>
            </ul>
            <p className="tutorial-warning">⚠ L'importazione sovrascrive tutti i dati esistenti.</p>
          </section>

          <section className="tutorial-section tutorial-flow">
            <h2>Flusso di gioco consigliato</h2>
            <ol>
              <li>Crea i personaggi giocatori → <strong>Party</strong></li>
              <li>Crea le categorie di mostri → <strong>Monsters</strong></li>
              <li>Crea gli incantesimi → <strong>Grimoire</strong></li>
              <li>Assegna gli incantesimi ai mostri → <strong>Monsters</strong> (sezione Spells)</li>
              <li>Attiva i giocatori (<em>In Game ✓</em>) → <strong>Party</strong></li>
              <li>Aggiungi i mostri al combattimento → <strong>Game › Monsters</strong></li>
              <li>Avanza con <strong>→</strong> e gestisci danno, cura e status</li>
              <li>Al termine, consulta il <strong>Defeated Log</strong> per i punti EXP</li>
            </ol>
          </section>

        </div>
      </div>
    </>
  );
}

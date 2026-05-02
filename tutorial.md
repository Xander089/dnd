# Tutorial — D&D Combat Tracker

Benvenuto nel **D&D Combat Tracker**, uno strumento pensato per aiutare il Master a gestire i combattimenti a turni in modo rapido e ordinato. Questa guida spiega tutto ciò che puoi fare, pagina per pagina.

---

## Navigazione

La barra a sinistra contiene cinque sezioni:

| Icona | Sezione | Scopo |
|-------|---------|-------|
| Tavolo | **Game** | Gestisci il combattimento in corso |
| Gruppo | **Party** | Crea e gestisci i personaggi giocatori |
| Mostro | **Monsters** | Crea e gestisci le categorie di mostri |
| Libro | **Grimoire** | Crea e gestisci il database degli incantesimi |
| Ingranaggio | **Settings** | Esporta o importa tutti i tuoi dati |

---

## 1. Party — Crea i tuoi giocatori

Prima di tutto, aggiungi i personaggi del gruppo. Vai nella sezione **Party**.

### Aggiungere un giocatore

1. Clicca **Add** nell'header in alto a destra.
2. Compila i campi nella nuova card:
   - **Name** — il nome del personaggio
   - **HP** / **Max HP** — punti vita attuali e massimi
   - **Initiative** — il modificatore di iniziativa
   - **Strength, Dexterity, Constitution, Intelligence, Charisma, Wisdom** — i sei attributi
3. Clicca **Add** per confermare. Il pulsante è disabilitato finché i campi obbligatori non sono compilati.

### Modificare un giocatore

Tutti i campi sono editabili direttamente nella card. Le modifiche vengono salvate automaticamente quando esci dal campo.

### Rimuovere un giocatore

Clicca l'icona **cestino** sulla card. Verrà chiesta conferma prima di eliminare il giocatore in modo definitivo.

### Includere un giocatore nel combattimento

Ogni card ha un campo **In Game**: se spuntato, il giocatore apparirà nella pagina Game quando avvii o aggiorni il combattimento.

---

## 2. Monsters — Crea le categorie di mostri

Vai nella sezione **Monsters**. Qui non crei singoli mostri, ma **categorie** (template) riutilizzabili — ad esempio "Goblin", "Orco", "Drago Rosso".

### Aggiungere una categoria

1. Clicca **Add**.
2. Compila i campi base nella card:
   - **Type** — nome della categoria
   - **HP** / **Max HP** — punti vita del singolo esemplare
   - **Initiative Modifier** — modificatore di iniziativa
   - I sei attributi

### Proprietà avanzate

Clicca la **freccia ▼** sulla card per espandere le proprietà avanzate. Si dividono in due gruppi:

**Sempre visibili in combattimento:**
- **AC** — Armor Class
- **Creature Type**, **Alignment**
- **Special Traits**, **Actions**

**Opzionali (visibili solo se compilate):**
- **Challenge Rating**, **Prof. Bonus**, **EXP**
- **Saving Throws**, **Senses**, **Abilities**
- **Bonus Actions**, **Reactions**, **Legendary Actions**
- **Resistances**, **Vulnerabilities**, **Dmg. Immunities**, **Cond. Immunities**

### Assegnare incantesimi a un mostro

Nella sezione avanzata, sotto **Spells**, trovi una barra di ricerca. Cerca un incantesimo dal Grimoire, selezionalo: apparirà come chip. Clicca **×** sul chip per rimuoverlo.

---

## 3. Grimoire — Crea il database degli incantesimi

Vai nella sezione **Grimoire**. Qui puoi costruire una libreria di incantesimi da assegnare ai mostri.

### Aggiungere un incantesimo

1. Clicca **Add** nell'header.
2. Compila i campi nella nuova riga:
   - **Name** — nome dell'incantesimo *(obbligatorio)*
   - **School** — scuola di magia (es. "Evocazione") *(obbligatorio)*
   - **Level** — livello dello slot richiesto
   - **Cast Time** + **Cast Unit** — tempo di lancio con unità (es. "1 Actions", "1 Bonus Actions")
   - **Range** — gittata (es. "60 feet")
   - **Duration** + **Dur. Unit** — durata con unità (es. "10 Minutes", "1 Hours")
   - **Effect** — descrizione dell'effetto *(obbligatorio)*
3. Clicca **Add** per salvare.

### Modificare un incantesimo

Tutti i campi sono editabili direttamente. Le modifiche vengono salvate automaticamente su `onBlur`. I dropdown **Cast Unit** e **Dur. Unit** consentono di scegliere tra: *Actions, Bonus Actions, Reactions, Rounds, Minutes, Hours, Days*.

---

## 4. Game — Gestisci il combattimento

Questa è la sezione principale. Tutte le azioni del combattimento avvengono qui.

### Avviare un combattimento

1. Assicurati che i giocatori abbiano **In Game** spuntato nella sezione Party.
2. Vai in **Game**. I giocatori compaiono automaticamente.
3. Clicca **Monsters** nell'header per aprire la finestra di selezione mostri.
4. Nella modale, per ogni categoria che vuoi aggiungere:
   - Spunta la **checkbox**
   - Inserisci la **quantità** di esemplari
   - (Opzionale) Inserisci un valore in **Initiative** per usare un roll manuale invece di uno casuale
5. Clicca **Ok**. I mostri vengono aggiunti alla lista con nomi automatici (es. "Goblin 1", "Goblin 2") e iniziativa assegnata.
6. (Opzionale) Usa il pulsante **Roll** nell'header per applicare un roll manuale all'ordine di turno.

### La lista dei combattenti

Ogni card mostra:
- **Name** — nome del combattente (sola lettura in Game)
- **HP** — punti vita attuali, editabile direttamente
  - Diventa **rosso** se HP = 0
  - Diventa **giallo** se HP < 3
- **Max HP** — sola lettura
- **Initiative** — editabile, usato per l'ordine
- **Status** — condizioni attive (vedi sezione dedicata)

La card con il **bordo evidenziato** è quella del combattente attivo.

### Avanzare di turno

Clicca la **freccia →** nell'HUD in basso a sinistra. Il gioco passa al prossimo combattente nella lista e i suoi status vengono decrementati. Il contatore **Turn X - Step Y / Z** si aggiorna di conseguenza.

> **Turn** = numero del giro completo. **Step** = indice del combattente attivo. **Z** = totale combattenti attivi.

Se necessario, puoi modificare manualmente turno e step cliccando **Edit** nell'HUD.

### Applicare danno o cura

Su ogni card trovi due pulsanti:
- **Spada** — apre la modale **Damage**: inserisci l'importo e clicca Ok. Gli HP scendono, la card lampeggia di rosso.
- **Cuore** — apre la modale **Cure**: inserisci l'importo e clicca Ok. Gli HP salgono, la card lampeggia di verde.

Ogni azione viene registrata nell'**History**.

> Se gli HP arrivano a 0, appare automaticamente la modale di rimozione.

### Rimuovere un combattente

Clicca l'icona **cestino** sulla card e conferma. I giocatori vengono disattivati (rimangono in Party), i mostri vengono eliminati e aggiunti al **Defeated Log** con tipo, nome e EXP guadagnata.

### Visualizzare i dettagli di un combattente

Clicca la **freccia ▼** sulla card per espandere i dettagli:
- I sei attributi (Strength, Dexterity, ecc.)
- Per i mostri: tutte le proprietà avanzate (AC, Actions, Legendary Actions, ecc.)
- Gli incantesimi assegnati compaiono come **chip**: passa il mouse sopra per vedere il tooltip completo dell'incantesimo (scuola, livello, tempo di lancio, gittata, durata, effetto)

---

## 5. Status delle condizioni

Ogni combattente può avere uno o più status (es. "Avvelenato", "Stordito") con una durata in turni.

### Gestire gli status

- Clicca **+** nella colonna Status per aggiungere una nuova condizione.
- Ogni status ha due campi: **nome** e **durata** (numero di turni).
- Clicca **×** per rimuovere uno status manualmente.

### Decremento automatico

Quando il turno passa a un combattente, la durata di tutti i suoi status attivi scende di 1. Quando un status arriva a 0 viene rimosso automaticamente e compare una **notifica toast** (es. *"Goblin 1 has no more Poison"*).

---

## 6. Effetto Globale

Un effetto globale è una condizione che si applica all'intero combattimento (es. "Oscurità", "Haste") e dura un certo numero di turni.

1. Clicca **Effect** nell'header della pagina Game.
2. Inserisci il **nome** e la **durata** in turni.
3. Clicca **Ok**.

L'effetto compare nell'header con il conteggio aggiornato dei turni rimanenti. Scompare automaticamente quando la durata arriva a 0.

---

## 7. Pannello laterale destro

Nell'header della pagina Game, la **freccia di espansione** mostra o nasconde il pannello con tre sezioni:

### Note

Un'area di testo libera per appunti durante il combattimento (es. descrizioni narrative, promemoria al master). Il contenuto viene salvato automaticamente.

### Defeated Log

Registra tutti i mostri rimossi dal combattimento con:
- Tipo, nome ed EXP guadagnata

Usa il pulsante **×** per cancellare l'intero log.

### History

Log cronologico di tutte le azioni:
- Turni avanzati
- Danni e cure applicate
- Effetti globali attivati
- Combattenti rimossi
- Modifiche manuali a HP e iniziativa

Usa il pulsante **×** per cancellare la cronologia.

---

## 8. Settings — Esporta e importa i dati

Tutti i dati (giocatori, mostri, incantesimi, impostazioni di gioco) sono salvati in locale nel browser. Usa la sezione **Settings** (icona ingranaggio) per fare backup o trasferirli.

### Esportare

1. Apri Settings.
2. La textarea mostra tutti i dati serializzati.
3. Clicca **Copy** per copiarli negli appunti.
4. Incollali in un file di testo per conservarli.

### Importare

1. Incolla una stringa di dati precedentemente esportata nella textarea.
2. Clicca **Apply**.
3. I dati vengono caricati immediatamente.

> **Attenzione:** l'importazione sovrascrive tutti i dati esistenti.

---

## Flusso di gioco consigliato

```
1. Crea i personaggi giocatori → Party
2. Crea le categorie di mostri → Monsters
3. Crea gli incantesimi → Grimoire
4. Assegna gli incantesimi ai mostri → Monsters (sezione Spells)
5. Attiva i giocatori (In Game ✓) → Party
6. Vai in Game → aggiungi i mostri con il pulsante Monsters
7. Avanza con → e gestisci danno, cura e status
8. Al termine, consulta Defeated Log per i punti EXP
```

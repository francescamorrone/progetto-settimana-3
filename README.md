# 🌌 Nebula

**Il diario di osservazione del cielo per gli amanti dello stargazing e dell'astronomia.**

Nebula è una web app che permette di tenere traccia dei corpi celesti osservati, annotando dove, quando e con quale strumento sono stati avvistati, e allegando le proprie foto. Ogni avvistamento diventa una scheda consultabile, filtrabile e ricercabile, da conservare tra i preferiti.

> 🚧 **Stato del progetto:** in sviluppo attivo. La versione attuale è interamente client-side; la visione a lungo termine è trasformarlo in una piattaforma per la community degli stargazer (vedi [Roadmap](#-roadmap)).

---

## 📑 Indice

- [Funzionalità](#-funzionalità)
- [Tecnologie](#-tecnologie)
- [Struttura dei dati](#-struttura-dei-dati)
- [Installazione e utilizzo](#-installazione-e-utilizzo)
- [Come si usa](#-come-si-usa)
- [Limiti noti](#-limiti-noti)
- [Roadmap](#-roadmap)
- [Autrice](#-autrice)

---

## ✨ Funzionalità

### Diario degli avvistamenti
- **Registrazione completa dell'osservazione**: nome del corpo celeste, categoria, data, ora, coordinate, strumento utilizzato e fotografia.
- **Card dedicata per ogni avvistamento**, generata dinamicamente a partire dai dati inseriti.
- **Modifica ed eliminazione** direttamente dalla card, con notifiche di conferma.

### Organizzazione e ricerca
- **Filtri per categoria**: Stelle, Satelliti, Galassie, Nebulose, Pianeti.
- **Sezione Preferiti**: ogni card ha una checkbox "Aggiungi ai preferiti" per raccogliere gli avvistamenti più significativi.
- **Barra di ricerca** per trovare rapidamente un corpo celeste per nome.
- **Riepilogo con contatori** del numero di avvistamenti totali, per categoria e tra i preferiti.

### Inserimento dati e validazione
- Pulsante **"+"** che apre il form di inserimento.
- **Validazione dei campi**: nome (obbligatorio, minimo 2 caratteri), categoria e immagine obbligatorie, con messaggi di errore a schermo e notifiche.
- Selezione della foto tramite upload, con restrizione ai soli file immagine.

### Esperienza utente
- **Dark mode** attivabile con un toggle.
- **Persistenza dei dati** tramite Local Storage: gli avvistamenti restano salvati tra una sessione e l'altra.
- **Dati di esempio** caricati al primo avvio, per provare subito l'applicazione.
- **Notifiche temporanee** (verdi per successo, rosse per errore) per ogni azione.

---

## 🛠️ Tecnologie

| Ambito | Strumenti |
| --- | --- |
| Struttura | HTML5 |
| Stile | CSS3 (tema chiaro/scuro) |
| Logica | JavaScript vanilla (ES6+), manipolazione del DOM |
| Persistenza | Web Storage API (`localStorage`) |
| Gestione file | `FileReader` API (immagini codificate in Base64) |

---

## 🔭 Come si usa

1. **Aggiungi un avvistamento** con il pulsante **"+"**: compila il form (i campi contrassegnati con `*` sono obbligatori) e premi **Inserisci**.
2. **Esplora la tua collezione** con i filtri per categoria o con la barra di ricerca.
3. **Segna i preferiti** spuntando la checkbox sulla card; li ritroverai nella sezione dedicata.
4. **Modifica o elimina** un avvistamento con i pulsanti presenti su ogni card.
5. **Cambia tema** con il toggle della dark mode, ideale per consultare il diario anche durante le osservazioni notturne.

---

## 🗺️ Roadmap

### Prossimi passi:
- [ ] Ordinamento alfabetico degli avvistamenti
- [ ] Ordinamento per data di osservazione
- [ ] Completamento e ottimizzazione del CSS (responsive design)
- [ ] Salvataggio delle preferenze del tema (chiaro/scuro)

### Visione a lungo termine: Nebula Community
L'obiettivo è evolvere Nebula da diario personale a **app sociale per la community dello stargazing**:

- [ ] **Account utente** e backend per la sincronizzazione dei dati
- [ ] **Condivisione di foto** e avvistamenti con gli altri appassionati
- [ ] **Mappa dei luoghi ideali** per l'osservazione (cieli privi di inquinamento luminoso, punti panoramici, consigli della community)
- [ ] **Calendario degli eventi astronomici**: piogge di meteore, eclissi, congiunzioni planetarie e altri avvistamenti futuri
- [ ] Interazioni social: commenti, apprezzamenti e profili degli osservatori

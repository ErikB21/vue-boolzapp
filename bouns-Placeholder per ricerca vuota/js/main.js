 const contacts = [
    {
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Ricordati di stendere i panni',
                status: 'sent'
            },
            {
                date: '10/01/2020 16:15:22',
                message: 'Tutto fatto!',
                status: 'received'
            }
        ],
    },

    {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [
            {
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
            },
            {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
            },
            {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent'
            }
        ],
    },

    {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [
            {
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
            },
            {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
            },
            {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received'
            }
        ],
    },

    {
        name: 'Alessandro B.',
        avatar: '_4',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Si, ma preferirei andare al cinema',
                status: 'received'
            }
        ],
    },

    {
        name: 'Alessandro L.',
        avatar: '_5',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ricordati di chiamare la nonna',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Va bene, stasera la sento',
                status: 'received'
            }
        ],
    },

    {
        name: 'Claudia',
        avatar: '_6',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao Claudia, hai novit???',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Non ancora',
                status: 'received'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'Nessuna nuova, buona nuova',
                status: 'sent'
            }
        ],
    },

    {
        name: 'Federico',
        avatar: '_7',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Fai gli auguri a Martina che ?? il suo compleanno!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Grazie per avermelo ricordato, le scrivo subito!',
                status: 'received'
            }
        ],
    },

    {
        name: 'Davide',
        avatar: '_8',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                status: 'received'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'No, l\'ho gi?? mangiata ieri, ordiniamo sushi!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'OK!!',
                status: 'received'
            }
        ],
    }
]; 

const whatsapp = new Vue(
    {
        el: '#whatsapp',
        data: {
            image_profilo : 0,
            contacts,
            itemContacts: contacts[0],
            chatContact : ''
        },
        methods:{
            //uso per stampare i diversi contatti
            getPic(index) { 
                return 'img/avatar' + index + '.jpg'; 
            },

            //al click sul contatto, cambia dinamicamente il contatto
            selectedContact(person){
                this.itemContacts = person;
                console.log(this.selectedContact.name);
            },

            //al click sul contatto scelto, viene attivata la classe active_bg
            setActive(indice){
                this.image_profilo = indice;
            },


            //alla pressione di enter, il messaggio che viene scritto apparir?? nella chat
            //aggiunta di trim, in modo da non mandare messaggi a vuoto o spaziato
            //new Date per stampare l'ora dei messaggi vecchi e correnti
            addMessage() {
                const chatContact = this.chatContact.trim();
                if(chatContact.length > 0){
                    this.itemContacts.messages.push(
                        {
                            date: new Date().toLocaleString(),
                            message: chatContact,
                            status: 'sent'
                        }
                    )
                    this.chatContact = '';
                };  

                //setTimeout, per stampare la risposta dell'interlocutore
                //new Date per stampare l'ora dei messaggi vecchi e correnti
                setTimeout(() => {
                    
                    this.itemContacts.messages.push({
    
                        date: new Date().toLocaleString(),
                        message: 'Ok!',
                        status: 'received'
    
                    })
                }, 2000) 
            },

            //questa funzione modifica il formato date 
            editDateToTime: function (date) {
                date = date.split(" ");
                let time = date[1].split(":");
                return `${time[0]}:${time[1]}`;
            },

            // questa funzione permette di stampare nella lsita contatti/ultimo accesso l'orario dell'ultimo messaggio
            lastRecivedMessageData: function (contact) {
                    console.log(contact);
                    let lastMessage;
                    let index = contact.messages.length - 1;
                    while (lastMessage === undefined) {
                        let message = contact.messages[index];
                        if (message.status === "received") {
                            lastMessage = message;
                            break;
                        }
                        index--;
                    }
                    lastMessage = this.editDateToTime(lastMessage.date);
                    return lastMessage;
            },

            //cerca contatto tramite ricerca lettere
            startSearchContact(){
                const search = document.querySelector('#searchContact').value.toLowerCase();
                const contact = this.contacts;
                contact.forEach((contact) =>{
                    if(contact.name.toLowerCase().includes(search)){
                        contact.visible = true;
                    }else{
                        contact.visible = false;
                    }
                })
            },

            //funzioni adibite a stampare l'ultimo messaggio nella Lista Contatti
            lastMessageElement(person){
                const messages = person.messages;
                const lastMessages = (messages.length > 0) ? messages[messages.length - 1]: undefined;
                return lastMessages;
            },

            lastMessage(person){
                const message = this.lastMessageElement(person);
                const lastMessage = (message) ? message.message : '';
                return lastMessage;
            },

            //mi permette di eliminare il messaggio
            deleteMessage(messageIndex) {
                this.itemContacts.messages.splice(messageIndex, 1 );
            },

            
           
        }


    }
);
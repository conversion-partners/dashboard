var config = {
    "data": "site/blocks/block-video/icon/data/icon.json",
    "schema": {
        "type": "object",
        "title": "Icoon",
        "properties": {
            "title": {
                "type": "string",
                "title": "Blok titel",
                "propertyOrder": 1
            },
            "popup_title": {
                "type": "string",
                "title": "Popup titel",
                "propertyOrder": 2
            },
            "category1": {
                "type": "string",
                "title": "Categorie 1",
                "enum": [
                    "start-grow",
                    "innovate",
                    "settle",
                    "general",
                    "milestones"
                ],
                "options": {
                	"enum_titles": [
                        "Starten & Doorgroeien",
                        "Sneller Innoveren",
                        "Vestigen in Twente",
                        "Algemeen",
                        "Mijlpalen"
                     ]
                },
                "default": "start-grow",
                "propertyOrder": 3
            },
            "category2": {
                "type": "string",
                "title": "Categorie 2",
                "enum": [
                    "",
                    "start-grow",
                    "innovate",
                    "settle",
                    "general",
                    "milestones"
                ],
                "options": {
                	"enum_titles": [
                        "",
                        "Starten & Doorgroeien",
                        "Sneller Innoveren",
                        "Vestigen in Twente",
                        "Algemeen",
                        "Mijlpalen"
                     ]
                },
                "default": "",
                "propertyOrder": 4
            },
            "icon": {
                "type": "string",
                "title": "Icoon",
                "enum": [
                    "building",
                    "coffee",
                    "eastholland",
                    "events",
                    "fund",
                    "globe",
                    "hands",
                    "innovationprojects",
                    "innovationvouchers",
                    "knowledgevouchers",
                    "lamp",
                    "lamps",
                    "milestone",
                    "money",
                    "patent",
                    "people",
                    "twente",
                    "rocket",
                    "scale",
                    "sign",
                    "speechbubble",
                    "suitcase",
                    "toparrangement",
                    "website"
                ],
                "options": {
                	"enum_titles": [
                        "Kantoorpand",
                        "Koffiemok",
                        "Oost Nederland",
                        "Evenementen",
                        "Fonds",
                        "Wereldbol",
                        "Handen schudden",
                        "Innovatieprojecten",
                        "Innovatievouchers",
                        "Kennisvouchers",
                        "Gloeilamp",
                        "Lampjes",
                        "Mijlpaal",
                        "Geld",
                        "Patenten",
                        "Werknemers",
                        "Twente",
                        "Raket",
                        "Weegschaal",
                        "Bouwbord",
                        "Tekstballon",
                        "Koffer",
                        "Top regeling",
                        "Website bezoekers"
                     ]
                },
                "default": "rocket",
                "propertyOrder": 5
            },
            "id": {
                "type": "string",
                "title": "ID",
                "propertyOrder": 6
            },
			"num": {
			    "type": "number",
			    "title": "Icoon nummer",
			    "propertyOrder": 7
			},
            "txt": {
                "type": "string",
                "title": "Icoon tekst",
                "propertyOrder": 8
            },
            "content": {
                "type": "string",
                "title": "Popup content",
                "format": "textarea",
                "propertyOrder": 9
            }
        }
    }
}

function init(step) {
	
    callback = function(editor) {
        $("<button type='button'>Toon content</button>").insertAfter("textarea");
        $("textarea").css("display", "none");
        $("button").on("click", function() {
            var textArea = $(this).prev();
            Core9.name = textArea.attr("name");
            var tmpName = Core9.name.replace('root[', '');
            tmpName = tmpName.substring(0, tmpName.length - 1);
            var name = editor.getEditor('root.' + tmpName);
            var data = {};
            if (name) {
                data = name.getValue();
            }
            
            // send to parent 
            Core9.parent.send({
                getwysiwyg: true,
                payload: data
            });
            
            // recieve from parent
            Core9.parent.receive(function(data, event) {
                var tmpName = Core9.name.replace('root[', '');
                tmpName = tmpName.substring(0, tmpName.length - 1);

                var name = editor.getEditor('root.' + tmpName);
                if (name) {
                    name.setValue(data.state.content);
                }
            });
        });
    }
    
    Wizard.run(step, config, callback);
}

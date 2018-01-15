export const unresolvedUser =  {
    "type": "object",
    "properties": {
        'permissions': {
            'wo': true,
            'visitor': true,
            'employees': true,
            'rs': true,
            'pp': true
         },
         'avatar': {
            "type": "string",
            "faker": "image.imageUrl"
         },
         'messages': {
            "type": "array",
            "minItems": 1,
            "maxItems": 10,
            "items": {
                "type": "object",
                "properties": {
                    "ider": {
                        "type": "string",
                        "faker": "random.uuid"
                    },
                    "typer": "wo",
                    "date": {
                        "type": "number",
                        "chance": "hammertime"
                    },
                    "title": {
                        "type": "string",
                        "faker": "lorem.words"
                    },
                    "body": {
                        "type": "string",
                        "faker": "lorem.paragraph"
                    }
                },
                required: ['ider', 'typer', 'date', 'title', 'body']
            }
         },
         'preferences': {}
    },
    required: ['messages', 'permissions', 'avatar']
}

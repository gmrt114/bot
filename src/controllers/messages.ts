import {CONTEXT_MESSAGE} from "../constants/contextMessageMapping";
import {getContextByValue} from "../services/database/context";
import {CacheInstance} from "../services/cache";

export const getMessageReply = async (
    services: {
        database: { getContextByValue: typeof getContextByValue };
        cache: CacheInstance;
    },
    input: {
        conversation_id: string;
        message: string;
    }
) => {

    // TODO: Process the input and return a response based on the input's context


    //generate key based on message.
    let key = input.message.replace(/\s+/g, '_').toLowerCase(),
        //get cache based by key
        context = services.cache.get(key);


    //check cache if undefined then store context by message.
    if (typeof context === "undefined") {

        let message = input.message;
        let keywords = message.split(" "),
            new_context = "NO_CONTEXT",
            exist;
        for (var i = 0; i < keywords.length; ++i) {
            exist = await getContextByValue(keywords[i].toLocaleLowerCase());
            //check if context exist
            if (typeof exist == "string") {
                new_context = exist;
                break;
            }
        }

        context = new_context;
        
        services.cache.insert(key, context)

    }


    //ignore ts check
    // @ts-ignore
    const context_message = CONTEXT_MESSAGE[context];

    return {
        response_id: input.conversation_id,
        response: context_message,
    };
};

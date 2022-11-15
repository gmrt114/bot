import {NextFunction, Request, Response} from "express";

const rules = {
    message: {
        type: "string",
        required: true
    },
    conversation_id: {
        type: null,
        required: true
    }
}

export const validateMessage = (req: Request, res: Response, next: NextFunction) => {

    let errors: any = {}, status = true, prop: string;


    for (let key in rules) {
        let rule = rules[key as keyof typeof rules];
        if (rule.required && !req.body[key]) {
            errors[key] = errors[key] || []
            errors[key].push(`${key} is required`);
            status = false;
        }
        if (req.body[key] && (rule.type && typeof req.body[key] != rule.type)) {
            errors[key] = errors[key] || [];
            errors[key].push(`${key} must be ${rule.type}`);
            status = false;
        }
    }

    if (status) {
        next();
    } else {
        res.status(400).json({
            message: "Invalid input",
            errors: errors
        });
    }
};

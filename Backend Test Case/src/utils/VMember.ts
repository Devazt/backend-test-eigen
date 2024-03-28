import * as Joi from 'joi';

export const CreateMemberSchema = Joi.object({
    name: Joi.string().required()
})

export const UpdateMemberSchema = Joi.object({
    name: Joi.string()
})
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TableSchema, DbSchema, Relation, ElectricClient, HKT } from 'electric-sql/client/model';
import migrations from './migrations';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const ContactsScalarFieldEnumSchema = z.enum(['id','first_name','last_name','website','avatar','notes']);

export const FavoriteContactsScalarFieldEnumSchema = z.enum(['id','user_id','contact_id']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TrpcCallsScalarFieldEnumSchema = z.enum(['id','createdat','elapsedms','path','input','type','state','clientid','response']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CONTACTS SCHEMA
/////////////////////////////////////////

export const ContactsSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  website: z.string().nullable(),
  avatar: z.string().nullable(),
  notes: z.string().nullable(),
})

export type Contacts = z.infer<typeof ContactsSchema>

/////////////////////////////////////////
// FAVORITE CONTACTS SCHEMA
/////////////////////////////////////////

export const FavoriteContactsSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  contact_id: z.string().uuid(),
})

export type FavoriteContacts = z.infer<typeof FavoriteContactsSchema>

/////////////////////////////////////////
// TRPC CALLS SCHEMA
/////////////////////////////////////////

export const TrpcCallsSchema = z.object({
  id: z.string().uuid(),
  createdat: z.coerce.date(),
  elapsedms: z.number().int().gte(-2147483648).lte(2147483647).nullable(),
  path: z.string(),
  input: z.string().nullable(),
  type: z.string(),
  state: z.string(),
  clientid: z.string(),
  response: z.string().nullable(),
})

export type TrpcCalls = z.infer<typeof TrpcCallsSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CONTACTS
//------------------------------------------------------

export const ContactsIncludeSchema: z.ZodType<Prisma.ContactsInclude> = z.object({
  favorite_contacts: z.union([z.boolean(),z.lazy(() => FavoriteContactsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ContactsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ContactsArgsSchema: z.ZodType<Prisma.ContactsArgs> = z.object({
  select: z.lazy(() => ContactsSelectSchema).optional(),
  include: z.lazy(() => ContactsIncludeSchema).optional(),
}).strict();

export const ContactsCountOutputTypeArgsSchema: z.ZodType<Prisma.ContactsCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ContactsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ContactsCountOutputTypeSelectSchema: z.ZodType<Prisma.ContactsCountOutputTypeSelect> = z.object({
  favorite_contacts: z.boolean().optional(),
}).strict();

export const ContactsSelectSchema: z.ZodType<Prisma.ContactsSelect> = z.object({
  id: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  website: z.boolean().optional(),
  avatar: z.boolean().optional(),
  notes: z.boolean().optional(),
  favorite_contacts: z.union([z.boolean(),z.lazy(() => FavoriteContactsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ContactsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FAVORITE CONTACTS
//------------------------------------------------------

export const FavoriteContactsIncludeSchema: z.ZodType<Prisma.FavoriteContactsInclude> = z.object({
  contacts: z.union([z.boolean(),z.lazy(() => ContactsArgsSchema)]).optional(),
}).strict()

export const FavoriteContactsArgsSchema: z.ZodType<Prisma.FavoriteContactsArgs> = z.object({
  select: z.lazy(() => FavoriteContactsSelectSchema).optional(),
  include: z.lazy(() => FavoriteContactsIncludeSchema).optional(),
}).strict();

export const FavoriteContactsSelectSchema: z.ZodType<Prisma.FavoriteContactsSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  contact_id: z.boolean().optional(),
  contacts: z.union([z.boolean(),z.lazy(() => ContactsArgsSchema)]).optional(),
}).strict()

// TRPC CALLS
//------------------------------------------------------

export const TrpcCallsSelectSchema: z.ZodType<Prisma.TrpcCallsSelect> = z.object({
  id: z.boolean().optional(),
  createdat: z.boolean().optional(),
  elapsedms: z.boolean().optional(),
  path: z.boolean().optional(),
  input: z.boolean().optional(),
  type: z.boolean().optional(),
  state: z.boolean().optional(),
  clientid: z.boolean().optional(),
  response: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ContactsWhereInputSchema: z.ZodType<Prisma.ContactsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContactsWhereInputSchema),z.lazy(() => ContactsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactsWhereInputSchema),z.lazy(() => ContactsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  last_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  favorite_contacts: z.lazy(() => FavoriteContactsListRelationFilterSchema).optional()
}).strict();

export const ContactsOrderByWithRelationInputSchema: z.ZodType<Prisma.ContactsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  favorite_contacts: z.lazy(() => FavoriteContactsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ContactsWhereUniqueInputSchema: z.ZodType<Prisma.ContactsWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const ContactsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContactsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ContactsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ContactsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ContactsMinOrderByAggregateInputSchema).optional()
}).strict();

export const ContactsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContactsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ContactsScalarWhereWithAggregatesInputSchema),z.lazy(() => ContactsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactsScalarWhereWithAggregatesInputSchema),z.lazy(() => ContactsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  last_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  website: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const FavoriteContactsWhereInputSchema: z.ZodType<Prisma.FavoriteContactsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FavoriteContactsWhereInputSchema),z.lazy(() => FavoriteContactsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FavoriteContactsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FavoriteContactsWhereInputSchema),z.lazy(() => FavoriteContactsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  contact_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  contacts: z.union([ z.lazy(() => ContactsRelationFilterSchema),z.lazy(() => ContactsWhereInputSchema) ]).optional(),
}).strict();

export const FavoriteContactsOrderByWithRelationInputSchema: z.ZodType<Prisma.FavoriteContactsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => ContactsOrderByWithRelationInputSchema).optional()
}).strict();

export const FavoriteContactsWhereUniqueInputSchema: z.ZodType<Prisma.FavoriteContactsWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const FavoriteContactsOrderByWithAggregationInputSchema: z.ZodType<Prisma.FavoriteContactsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FavoriteContactsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FavoriteContactsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FavoriteContactsMinOrderByAggregateInputSchema).optional()
}).strict();

export const FavoriteContactsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FavoriteContactsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FavoriteContactsScalarWhereWithAggregatesInputSchema),z.lazy(() => FavoriteContactsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FavoriteContactsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FavoriteContactsScalarWhereWithAggregatesInputSchema),z.lazy(() => FavoriteContactsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  contact_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TrpcCallsWhereInputSchema: z.ZodType<Prisma.TrpcCallsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TrpcCallsWhereInputSchema),z.lazy(() => TrpcCallsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TrpcCallsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TrpcCallsWhereInputSchema),z.lazy(() => TrpcCallsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  createdat: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  elapsedms: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  path: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  input: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clientid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  response: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const TrpcCallsOrderByWithRelationInputSchema: z.ZodType<Prisma.TrpcCallsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdat: z.lazy(() => SortOrderSchema).optional(),
  elapsedms: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  input: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  clientid: z.lazy(() => SortOrderSchema).optional(),
  response: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TrpcCallsWhereUniqueInputSchema: z.ZodType<Prisma.TrpcCallsWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const TrpcCallsOrderByWithAggregationInputSchema: z.ZodType<Prisma.TrpcCallsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdat: z.lazy(() => SortOrderSchema).optional(),
  elapsedms: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  input: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  clientid: z.lazy(() => SortOrderSchema).optional(),
  response: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TrpcCallsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TrpcCallsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TrpcCallsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TrpcCallsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TrpcCallsSumOrderByAggregateInputSchema).optional()
}).strict();

export const TrpcCallsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TrpcCallsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TrpcCallsScalarWhereWithAggregatesInputSchema),z.lazy(() => TrpcCallsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TrpcCallsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TrpcCallsScalarWhereWithAggregatesInputSchema),z.lazy(() => TrpcCallsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  createdat: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  elapsedms: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  path: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  input: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  clientid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  response: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ContactsCreateInputSchema: z.ZodType<Prisma.ContactsCreateInput> = z.object({
  id: z.string().uuid(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  favorite_contacts: z.lazy(() => FavoriteContactsCreateNestedManyWithoutContactsInputSchema).optional()
}).strict();

export const ContactsUncheckedCreateInputSchema: z.ZodType<Prisma.ContactsUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  favorite_contacts: z.lazy(() => FavoriteContactsUncheckedCreateNestedManyWithoutContactsInputSchema).optional()
}).strict();

export const ContactsUpdateInputSchema: z.ZodType<Prisma.ContactsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  favorite_contacts: z.lazy(() => FavoriteContactsUpdateManyWithoutContactsNestedInputSchema).optional()
}).strict();

export const ContactsUncheckedUpdateInputSchema: z.ZodType<Prisma.ContactsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  favorite_contacts: z.lazy(() => FavoriteContactsUncheckedUpdateManyWithoutContactsNestedInputSchema).optional()
}).strict();

export const ContactsCreateManyInputSchema: z.ZodType<Prisma.ContactsCreateManyInput> = z.object({
  id: z.string().uuid(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  notes: z.string().optional().nullable()
}).strict();

export const ContactsUpdateManyMutationInputSchema: z.ZodType<Prisma.ContactsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ContactsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContactsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FavoriteContactsCreateInputSchema: z.ZodType<Prisma.FavoriteContactsCreateInput> = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  contacts: z.lazy(() => ContactsCreateNestedOneWithoutFavorite_contactsInputSchema)
}).strict();

export const FavoriteContactsUncheckedCreateInputSchema: z.ZodType<Prisma.FavoriteContactsUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  contact_id: z.string().uuid()
}).strict();

export const FavoriteContactsUpdateInputSchema: z.ZodType<Prisma.FavoriteContactsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.lazy(() => ContactsUpdateOneRequiredWithoutFavorite_contactsNestedInputSchema).optional()
}).strict();

export const FavoriteContactsUncheckedUpdateInputSchema: z.ZodType<Prisma.FavoriteContactsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FavoriteContactsCreateManyInputSchema: z.ZodType<Prisma.FavoriteContactsCreateManyInput> = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  contact_id: z.string().uuid()
}).strict();

export const FavoriteContactsUpdateManyMutationInputSchema: z.ZodType<Prisma.FavoriteContactsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FavoriteContactsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FavoriteContactsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TrpcCallsCreateInputSchema: z.ZodType<Prisma.TrpcCallsCreateInput> = z.object({
  id: z.string().uuid(),
  createdat: z.coerce.date(),
  elapsedms: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  path: z.string(),
  input: z.string().optional().nullable(),
  type: z.string(),
  state: z.string(),
  clientid: z.string(),
  response: z.string().optional().nullable()
}).strict();

export const TrpcCallsUncheckedCreateInputSchema: z.ZodType<Prisma.TrpcCallsUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  createdat: z.coerce.date(),
  elapsedms: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  path: z.string(),
  input: z.string().optional().nullable(),
  type: z.string(),
  state: z.string(),
  clientid: z.string(),
  response: z.string().optional().nullable()
}).strict();

export const TrpcCallsUpdateInputSchema: z.ZodType<Prisma.TrpcCallsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdat: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  elapsedms: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TrpcCallsUncheckedUpdateInputSchema: z.ZodType<Prisma.TrpcCallsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdat: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  elapsedms: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TrpcCallsCreateManyInputSchema: z.ZodType<Prisma.TrpcCallsCreateManyInput> = z.object({
  id: z.string().uuid(),
  createdat: z.coerce.date(),
  elapsedms: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  path: z.string(),
  input: z.string().optional().nullable(),
  type: z.string(),
  state: z.string(),
  clientid: z.string(),
  response: z.string().optional().nullable()
}).strict();

export const TrpcCallsUpdateManyMutationInputSchema: z.ZodType<Prisma.TrpcCallsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdat: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  elapsedms: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TrpcCallsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TrpcCallsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdat: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  elapsedms: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  response: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FavoriteContactsListRelationFilterSchema: z.ZodType<Prisma.FavoriteContactsListRelationFilter> = z.object({
  every: z.lazy(() => FavoriteContactsWhereInputSchema).optional(),
  some: z.lazy(() => FavoriteContactsWhereInputSchema).optional(),
  none: z.lazy(() => FavoriteContactsWhereInputSchema).optional()
}).strict();

export const FavoriteContactsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FavoriteContactsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContactsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContactsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContactsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const ContactsRelationFilterSchema: z.ZodType<Prisma.ContactsRelationFilter> = z.object({
  is: z.lazy(() => ContactsWhereInputSchema).optional(),
  isNot: z.lazy(() => ContactsWhereInputSchema).optional()
}).strict();

export const FavoriteContactsCountOrderByAggregateInputSchema: z.ZodType<Prisma.FavoriteContactsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FavoriteContactsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FavoriteContactsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FavoriteContactsMinOrderByAggregateInputSchema: z.ZodType<Prisma.FavoriteContactsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const TrpcCallsCountOrderByAggregateInputSchema: z.ZodType<Prisma.TrpcCallsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdat: z.lazy(() => SortOrderSchema).optional(),
  elapsedms: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  input: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  clientid: z.lazy(() => SortOrderSchema).optional(),
  response: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TrpcCallsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TrpcCallsAvgOrderByAggregateInput> = z.object({
  elapsedms: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TrpcCallsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TrpcCallsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdat: z.lazy(() => SortOrderSchema).optional(),
  elapsedms: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  input: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  clientid: z.lazy(() => SortOrderSchema).optional(),
  response: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TrpcCallsMinOrderByAggregateInputSchema: z.ZodType<Prisma.TrpcCallsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdat: z.lazy(() => SortOrderSchema).optional(),
  elapsedms: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  input: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  clientid: z.lazy(() => SortOrderSchema).optional(),
  response: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TrpcCallsSumOrderByAggregateInputSchema: z.ZodType<Prisma.TrpcCallsSumOrderByAggregateInput> = z.object({
  elapsedms: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const FavoriteContactsCreateNestedManyWithoutContactsInputSchema: z.ZodType<Prisma.FavoriteContactsCreateNestedManyWithoutContactsInput> = z.object({
  create: z.union([ z.lazy(() => FavoriteContactsCreateWithoutContactsInputSchema),z.lazy(() => FavoriteContactsCreateWithoutContactsInputSchema).array(),z.lazy(() => FavoriteContactsUncheckedCreateWithoutContactsInputSchema),z.lazy(() => FavoriteContactsUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoriteContactsCreateOrConnectWithoutContactsInputSchema),z.lazy(() => FavoriteContactsCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoriteContactsCreateManyContactsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FavoriteContactsWhereUniqueInputSchema),z.lazy(() => FavoriteContactsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FavoriteContactsUncheckedCreateNestedManyWithoutContactsInputSchema: z.ZodType<Prisma.FavoriteContactsUncheckedCreateNestedManyWithoutContactsInput> = z.object({
  create: z.union([ z.lazy(() => FavoriteContactsCreateWithoutContactsInputSchema),z.lazy(() => FavoriteContactsCreateWithoutContactsInputSchema).array(),z.lazy(() => FavoriteContactsUncheckedCreateWithoutContactsInputSchema),z.lazy(() => FavoriteContactsUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoriteContactsCreateOrConnectWithoutContactsInputSchema),z.lazy(() => FavoriteContactsCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoriteContactsCreateManyContactsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FavoriteContactsWhereUniqueInputSchema),z.lazy(() => FavoriteContactsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const FavoriteContactsUpdateManyWithoutContactsNestedInputSchema: z.ZodType<Prisma.FavoriteContactsUpdateManyWithoutContactsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FavoriteContactsCreateWithoutContactsInputSchema),z.lazy(() => FavoriteContactsCreateWithoutContactsInputSchema).array(),z.lazy(() => FavoriteContactsUncheckedCreateWithoutContactsInputSchema),z.lazy(() => FavoriteContactsUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoriteContactsCreateOrConnectWithoutContactsInputSchema),z.lazy(() => FavoriteContactsCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FavoriteContactsUpsertWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => FavoriteContactsUpsertWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoriteContactsCreateManyContactsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FavoriteContactsWhereUniqueInputSchema),z.lazy(() => FavoriteContactsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FavoriteContactsWhereUniqueInputSchema),z.lazy(() => FavoriteContactsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FavoriteContactsWhereUniqueInputSchema),z.lazy(() => FavoriteContactsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FavoriteContactsWhereUniqueInputSchema),z.lazy(() => FavoriteContactsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FavoriteContactsUpdateWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => FavoriteContactsUpdateWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FavoriteContactsUpdateManyWithWhereWithoutContactsInputSchema),z.lazy(() => FavoriteContactsUpdateManyWithWhereWithoutContactsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FavoriteContactsScalarWhereInputSchema),z.lazy(() => FavoriteContactsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FavoriteContactsUncheckedUpdateManyWithoutContactsNestedInputSchema: z.ZodType<Prisma.FavoriteContactsUncheckedUpdateManyWithoutContactsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FavoriteContactsCreateWithoutContactsInputSchema),z.lazy(() => FavoriteContactsCreateWithoutContactsInputSchema).array(),z.lazy(() => FavoriteContactsUncheckedCreateWithoutContactsInputSchema),z.lazy(() => FavoriteContactsUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavoriteContactsCreateOrConnectWithoutContactsInputSchema),z.lazy(() => FavoriteContactsCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FavoriteContactsUpsertWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => FavoriteContactsUpsertWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavoriteContactsCreateManyContactsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FavoriteContactsWhereUniqueInputSchema),z.lazy(() => FavoriteContactsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FavoriteContactsWhereUniqueInputSchema),z.lazy(() => FavoriteContactsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FavoriteContactsWhereUniqueInputSchema),z.lazy(() => FavoriteContactsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FavoriteContactsWhereUniqueInputSchema),z.lazy(() => FavoriteContactsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FavoriteContactsUpdateWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => FavoriteContactsUpdateWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FavoriteContactsUpdateManyWithWhereWithoutContactsInputSchema),z.lazy(() => FavoriteContactsUpdateManyWithWhereWithoutContactsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FavoriteContactsScalarWhereInputSchema),z.lazy(() => FavoriteContactsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ContactsCreateNestedOneWithoutFavorite_contactsInputSchema: z.ZodType<Prisma.ContactsCreateNestedOneWithoutFavorite_contactsInput> = z.object({
  create: z.union([ z.lazy(() => ContactsCreateWithoutFavorite_contactsInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutFavorite_contactsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContactsCreateOrConnectWithoutFavorite_contactsInputSchema).optional(),
  connect: z.lazy(() => ContactsWhereUniqueInputSchema).optional()
}).strict();

export const ContactsUpdateOneRequiredWithoutFavorite_contactsNestedInputSchema: z.ZodType<Prisma.ContactsUpdateOneRequiredWithoutFavorite_contactsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContactsCreateWithoutFavorite_contactsInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutFavorite_contactsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ContactsCreateOrConnectWithoutFavorite_contactsInputSchema).optional(),
  upsert: z.lazy(() => ContactsUpsertWithoutFavorite_contactsInputSchema).optional(),
  connect: z.lazy(() => ContactsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ContactsUpdateWithoutFavorite_contactsInputSchema),z.lazy(() => ContactsUncheckedUpdateWithoutFavorite_contactsInputSchema) ]).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const FavoriteContactsCreateWithoutContactsInputSchema: z.ZodType<Prisma.FavoriteContactsCreateWithoutContactsInput> = z.object({
  id: z.string(),
  user_id: z.string()
}).strict();

export const FavoriteContactsUncheckedCreateWithoutContactsInputSchema: z.ZodType<Prisma.FavoriteContactsUncheckedCreateWithoutContactsInput> = z.object({
  id: z.string(),
  user_id: z.string()
}).strict();

export const FavoriteContactsCreateOrConnectWithoutContactsInputSchema: z.ZodType<Prisma.FavoriteContactsCreateOrConnectWithoutContactsInput> = z.object({
  where: z.lazy(() => FavoriteContactsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FavoriteContactsCreateWithoutContactsInputSchema),z.lazy(() => FavoriteContactsUncheckedCreateWithoutContactsInputSchema) ]),
}).strict();

export const FavoriteContactsCreateManyContactsInputEnvelopeSchema: z.ZodType<Prisma.FavoriteContactsCreateManyContactsInputEnvelope> = z.object({
  data: z.lazy(() => FavoriteContactsCreateManyContactsInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FavoriteContactsUpsertWithWhereUniqueWithoutContactsInputSchema: z.ZodType<Prisma.FavoriteContactsUpsertWithWhereUniqueWithoutContactsInput> = z.object({
  where: z.lazy(() => FavoriteContactsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FavoriteContactsUpdateWithoutContactsInputSchema),z.lazy(() => FavoriteContactsUncheckedUpdateWithoutContactsInputSchema) ]),
  create: z.union([ z.lazy(() => FavoriteContactsCreateWithoutContactsInputSchema),z.lazy(() => FavoriteContactsUncheckedCreateWithoutContactsInputSchema) ]),
}).strict();

export const FavoriteContactsUpdateWithWhereUniqueWithoutContactsInputSchema: z.ZodType<Prisma.FavoriteContactsUpdateWithWhereUniqueWithoutContactsInput> = z.object({
  where: z.lazy(() => FavoriteContactsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FavoriteContactsUpdateWithoutContactsInputSchema),z.lazy(() => FavoriteContactsUncheckedUpdateWithoutContactsInputSchema) ]),
}).strict();

export const FavoriteContactsUpdateManyWithWhereWithoutContactsInputSchema: z.ZodType<Prisma.FavoriteContactsUpdateManyWithWhereWithoutContactsInput> = z.object({
  where: z.lazy(() => FavoriteContactsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FavoriteContactsUpdateManyMutationInputSchema),z.lazy(() => FavoriteContactsUncheckedUpdateManyWithoutFavorite_contactsInputSchema) ]),
}).strict();

export const FavoriteContactsScalarWhereInputSchema: z.ZodType<Prisma.FavoriteContactsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FavoriteContactsScalarWhereInputSchema),z.lazy(() => FavoriteContactsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FavoriteContactsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FavoriteContactsScalarWhereInputSchema),z.lazy(() => FavoriteContactsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  contact_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict();

export const ContactsCreateWithoutFavorite_contactsInputSchema: z.ZodType<Prisma.ContactsCreateWithoutFavorite_contactsInput> = z.object({
  id: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  notes: z.string().optional().nullable()
}).strict();

export const ContactsUncheckedCreateWithoutFavorite_contactsInputSchema: z.ZodType<Prisma.ContactsUncheckedCreateWithoutFavorite_contactsInput> = z.object({
  id: z.string(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  notes: z.string().optional().nullable()
}).strict();

export const ContactsCreateOrConnectWithoutFavorite_contactsInputSchema: z.ZodType<Prisma.ContactsCreateOrConnectWithoutFavorite_contactsInput> = z.object({
  where: z.lazy(() => ContactsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContactsCreateWithoutFavorite_contactsInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutFavorite_contactsInputSchema) ]),
}).strict();

export const ContactsUpsertWithoutFavorite_contactsInputSchema: z.ZodType<Prisma.ContactsUpsertWithoutFavorite_contactsInput> = z.object({
  update: z.union([ z.lazy(() => ContactsUpdateWithoutFavorite_contactsInputSchema),z.lazy(() => ContactsUncheckedUpdateWithoutFavorite_contactsInputSchema) ]),
  create: z.union([ z.lazy(() => ContactsCreateWithoutFavorite_contactsInputSchema),z.lazy(() => ContactsUncheckedCreateWithoutFavorite_contactsInputSchema) ]),
}).strict();

export const ContactsUpdateWithoutFavorite_contactsInputSchema: z.ZodType<Prisma.ContactsUpdateWithoutFavorite_contactsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ContactsUncheckedUpdateWithoutFavorite_contactsInputSchema: z.ZodType<Prisma.ContactsUncheckedUpdateWithoutFavorite_contactsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FavoriteContactsCreateManyContactsInputSchema: z.ZodType<Prisma.FavoriteContactsCreateManyContactsInput> = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid()
}).strict();

export const FavoriteContactsUpdateWithoutContactsInputSchema: z.ZodType<Prisma.FavoriteContactsUpdateWithoutContactsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FavoriteContactsUncheckedUpdateWithoutContactsInputSchema: z.ZodType<Prisma.FavoriteContactsUncheckedUpdateWithoutContactsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FavoriteContactsUncheckedUpdateManyWithoutFavorite_contactsInputSchema: z.ZodType<Prisma.FavoriteContactsUncheckedUpdateManyWithoutFavorite_contactsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ContactsFindFirstArgsSchema: z.ZodType<Prisma.ContactsFindFirstArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereInputSchema.optional(),
  orderBy: z.union([ ContactsOrderByWithRelationInputSchema.array(),ContactsOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ContactsScalarFieldEnumSchema.array().optional(),
}).strict()

export const ContactsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ContactsFindFirstOrThrowArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereInputSchema.optional(),
  orderBy: z.union([ ContactsOrderByWithRelationInputSchema.array(),ContactsOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ContactsScalarFieldEnumSchema.array().optional(),
}).strict()

export const ContactsFindManyArgsSchema: z.ZodType<Prisma.ContactsFindManyArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereInputSchema.optional(),
  orderBy: z.union([ ContactsOrderByWithRelationInputSchema.array(),ContactsOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ContactsScalarFieldEnumSchema.array().optional(),
}).strict()

export const ContactsAggregateArgsSchema: z.ZodType<Prisma.ContactsAggregateArgs> = z.object({
  where: ContactsWhereInputSchema.optional(),
  orderBy: z.union([ ContactsOrderByWithRelationInputSchema.array(),ContactsOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ContactsGroupByArgsSchema: z.ZodType<Prisma.ContactsGroupByArgs> = z.object({
  where: ContactsWhereInputSchema.optional(),
  orderBy: z.union([ ContactsOrderByWithAggregationInputSchema.array(),ContactsOrderByWithAggregationInputSchema ]).optional(),
  by: ContactsScalarFieldEnumSchema.array(),
  having: ContactsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ContactsFindUniqueArgsSchema: z.ZodType<Prisma.ContactsFindUniqueArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereUniqueInputSchema,
}).strict()

export const ContactsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ContactsFindUniqueOrThrowArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereUniqueInputSchema,
}).strict()

export const FavoriteContactsFindFirstArgsSchema: z.ZodType<Prisma.FavoriteContactsFindFirstArgs> = z.object({
  select: FavoriteContactsSelectSchema.optional(),
  include: FavoriteContactsIncludeSchema.optional(),
  where: FavoriteContactsWhereInputSchema.optional(),
  orderBy: z.union([ FavoriteContactsOrderByWithRelationInputSchema.array(),FavoriteContactsOrderByWithRelationInputSchema ]).optional(),
  cursor: FavoriteContactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FavoriteContactsScalarFieldEnumSchema.array().optional(),
}).strict()

export const FavoriteContactsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FavoriteContactsFindFirstOrThrowArgs> = z.object({
  select: FavoriteContactsSelectSchema.optional(),
  include: FavoriteContactsIncludeSchema.optional(),
  where: FavoriteContactsWhereInputSchema.optional(),
  orderBy: z.union([ FavoriteContactsOrderByWithRelationInputSchema.array(),FavoriteContactsOrderByWithRelationInputSchema ]).optional(),
  cursor: FavoriteContactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FavoriteContactsScalarFieldEnumSchema.array().optional(),
}).strict()

export const FavoriteContactsFindManyArgsSchema: z.ZodType<Prisma.FavoriteContactsFindManyArgs> = z.object({
  select: FavoriteContactsSelectSchema.optional(),
  include: FavoriteContactsIncludeSchema.optional(),
  where: FavoriteContactsWhereInputSchema.optional(),
  orderBy: z.union([ FavoriteContactsOrderByWithRelationInputSchema.array(),FavoriteContactsOrderByWithRelationInputSchema ]).optional(),
  cursor: FavoriteContactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FavoriteContactsScalarFieldEnumSchema.array().optional(),
}).strict()

export const FavoriteContactsAggregateArgsSchema: z.ZodType<Prisma.FavoriteContactsAggregateArgs> = z.object({
  where: FavoriteContactsWhereInputSchema.optional(),
  orderBy: z.union([ FavoriteContactsOrderByWithRelationInputSchema.array(),FavoriteContactsOrderByWithRelationInputSchema ]).optional(),
  cursor: FavoriteContactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FavoriteContactsGroupByArgsSchema: z.ZodType<Prisma.FavoriteContactsGroupByArgs> = z.object({
  where: FavoriteContactsWhereInputSchema.optional(),
  orderBy: z.union([ FavoriteContactsOrderByWithAggregationInputSchema.array(),FavoriteContactsOrderByWithAggregationInputSchema ]).optional(),
  by: FavoriteContactsScalarFieldEnumSchema.array(),
  having: FavoriteContactsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FavoriteContactsFindUniqueArgsSchema: z.ZodType<Prisma.FavoriteContactsFindUniqueArgs> = z.object({
  select: FavoriteContactsSelectSchema.optional(),
  include: FavoriteContactsIncludeSchema.optional(),
  where: FavoriteContactsWhereUniqueInputSchema,
}).strict()

export const FavoriteContactsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FavoriteContactsFindUniqueOrThrowArgs> = z.object({
  select: FavoriteContactsSelectSchema.optional(),
  include: FavoriteContactsIncludeSchema.optional(),
  where: FavoriteContactsWhereUniqueInputSchema,
}).strict()

export const TrpcCallsFindFirstArgsSchema: z.ZodType<Prisma.TrpcCallsFindFirstArgs> = z.object({
  select: TrpcCallsSelectSchema.optional(),
  where: TrpcCallsWhereInputSchema.optional(),
  orderBy: z.union([ TrpcCallsOrderByWithRelationInputSchema.array(),TrpcCallsOrderByWithRelationInputSchema ]).optional(),
  cursor: TrpcCallsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TrpcCallsScalarFieldEnumSchema.array().optional(),
}).strict()

export const TrpcCallsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TrpcCallsFindFirstOrThrowArgs> = z.object({
  select: TrpcCallsSelectSchema.optional(),
  where: TrpcCallsWhereInputSchema.optional(),
  orderBy: z.union([ TrpcCallsOrderByWithRelationInputSchema.array(),TrpcCallsOrderByWithRelationInputSchema ]).optional(),
  cursor: TrpcCallsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TrpcCallsScalarFieldEnumSchema.array().optional(),
}).strict()

export const TrpcCallsFindManyArgsSchema: z.ZodType<Prisma.TrpcCallsFindManyArgs> = z.object({
  select: TrpcCallsSelectSchema.optional(),
  where: TrpcCallsWhereInputSchema.optional(),
  orderBy: z.union([ TrpcCallsOrderByWithRelationInputSchema.array(),TrpcCallsOrderByWithRelationInputSchema ]).optional(),
  cursor: TrpcCallsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TrpcCallsScalarFieldEnumSchema.array().optional(),
}).strict()

export const TrpcCallsAggregateArgsSchema: z.ZodType<Prisma.TrpcCallsAggregateArgs> = z.object({
  where: TrpcCallsWhereInputSchema.optional(),
  orderBy: z.union([ TrpcCallsOrderByWithRelationInputSchema.array(),TrpcCallsOrderByWithRelationInputSchema ]).optional(),
  cursor: TrpcCallsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TrpcCallsGroupByArgsSchema: z.ZodType<Prisma.TrpcCallsGroupByArgs> = z.object({
  where: TrpcCallsWhereInputSchema.optional(),
  orderBy: z.union([ TrpcCallsOrderByWithAggregationInputSchema.array(),TrpcCallsOrderByWithAggregationInputSchema ]).optional(),
  by: TrpcCallsScalarFieldEnumSchema.array(),
  having: TrpcCallsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TrpcCallsFindUniqueArgsSchema: z.ZodType<Prisma.TrpcCallsFindUniqueArgs> = z.object({
  select: TrpcCallsSelectSchema.optional(),
  where: TrpcCallsWhereUniqueInputSchema,
}).strict()

export const TrpcCallsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TrpcCallsFindUniqueOrThrowArgs> = z.object({
  select: TrpcCallsSelectSchema.optional(),
  where: TrpcCallsWhereUniqueInputSchema,
}).strict()

export const ContactsCreateArgsSchema: z.ZodType<Prisma.ContactsCreateArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  data: z.union([ ContactsCreateInputSchema,ContactsUncheckedCreateInputSchema ]),
}).strict()

export const ContactsUpsertArgsSchema: z.ZodType<Prisma.ContactsUpsertArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereUniqueInputSchema,
  create: z.union([ ContactsCreateInputSchema,ContactsUncheckedCreateInputSchema ]),
  update: z.union([ ContactsUpdateInputSchema,ContactsUncheckedUpdateInputSchema ]),
}).strict()

export const ContactsCreateManyArgsSchema: z.ZodType<Prisma.ContactsCreateManyArgs> = z.object({
  data: ContactsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ContactsDeleteArgsSchema: z.ZodType<Prisma.ContactsDeleteArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereUniqueInputSchema,
}).strict()

export const ContactsUpdateArgsSchema: z.ZodType<Prisma.ContactsUpdateArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  data: z.union([ ContactsUpdateInputSchema,ContactsUncheckedUpdateInputSchema ]),
  where: ContactsWhereUniqueInputSchema,
}).strict()

export const ContactsUpdateManyArgsSchema: z.ZodType<Prisma.ContactsUpdateManyArgs> = z.object({
  data: z.union([ ContactsUpdateManyMutationInputSchema,ContactsUncheckedUpdateManyInputSchema ]),
  where: ContactsWhereInputSchema.optional(),
}).strict()

export const ContactsDeleteManyArgsSchema: z.ZodType<Prisma.ContactsDeleteManyArgs> = z.object({
  where: ContactsWhereInputSchema.optional(),
}).strict()

export const FavoriteContactsCreateArgsSchema: z.ZodType<Prisma.FavoriteContactsCreateArgs> = z.object({
  select: FavoriteContactsSelectSchema.optional(),
  include: FavoriteContactsIncludeSchema.optional(),
  data: z.union([ FavoriteContactsCreateInputSchema,FavoriteContactsUncheckedCreateInputSchema ]),
}).strict()

export const FavoriteContactsUpsertArgsSchema: z.ZodType<Prisma.FavoriteContactsUpsertArgs> = z.object({
  select: FavoriteContactsSelectSchema.optional(),
  include: FavoriteContactsIncludeSchema.optional(),
  where: FavoriteContactsWhereUniqueInputSchema,
  create: z.union([ FavoriteContactsCreateInputSchema,FavoriteContactsUncheckedCreateInputSchema ]),
  update: z.union([ FavoriteContactsUpdateInputSchema,FavoriteContactsUncheckedUpdateInputSchema ]),
}).strict()

export const FavoriteContactsCreateManyArgsSchema: z.ZodType<Prisma.FavoriteContactsCreateManyArgs> = z.object({
  data: FavoriteContactsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const FavoriteContactsDeleteArgsSchema: z.ZodType<Prisma.FavoriteContactsDeleteArgs> = z.object({
  select: FavoriteContactsSelectSchema.optional(),
  include: FavoriteContactsIncludeSchema.optional(),
  where: FavoriteContactsWhereUniqueInputSchema,
}).strict()

export const FavoriteContactsUpdateArgsSchema: z.ZodType<Prisma.FavoriteContactsUpdateArgs> = z.object({
  select: FavoriteContactsSelectSchema.optional(),
  include: FavoriteContactsIncludeSchema.optional(),
  data: z.union([ FavoriteContactsUpdateInputSchema,FavoriteContactsUncheckedUpdateInputSchema ]),
  where: FavoriteContactsWhereUniqueInputSchema,
}).strict()

export const FavoriteContactsUpdateManyArgsSchema: z.ZodType<Prisma.FavoriteContactsUpdateManyArgs> = z.object({
  data: z.union([ FavoriteContactsUpdateManyMutationInputSchema,FavoriteContactsUncheckedUpdateManyInputSchema ]),
  where: FavoriteContactsWhereInputSchema.optional(),
}).strict()

export const FavoriteContactsDeleteManyArgsSchema: z.ZodType<Prisma.FavoriteContactsDeleteManyArgs> = z.object({
  where: FavoriteContactsWhereInputSchema.optional(),
}).strict()

export const TrpcCallsCreateArgsSchema: z.ZodType<Prisma.TrpcCallsCreateArgs> = z.object({
  select: TrpcCallsSelectSchema.optional(),
  data: z.union([ TrpcCallsCreateInputSchema,TrpcCallsUncheckedCreateInputSchema ]),
}).strict()

export const TrpcCallsUpsertArgsSchema: z.ZodType<Prisma.TrpcCallsUpsertArgs> = z.object({
  select: TrpcCallsSelectSchema.optional(),
  where: TrpcCallsWhereUniqueInputSchema,
  create: z.union([ TrpcCallsCreateInputSchema,TrpcCallsUncheckedCreateInputSchema ]),
  update: z.union([ TrpcCallsUpdateInputSchema,TrpcCallsUncheckedUpdateInputSchema ]),
}).strict()

export const TrpcCallsCreateManyArgsSchema: z.ZodType<Prisma.TrpcCallsCreateManyArgs> = z.object({
  data: TrpcCallsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const TrpcCallsDeleteArgsSchema: z.ZodType<Prisma.TrpcCallsDeleteArgs> = z.object({
  select: TrpcCallsSelectSchema.optional(),
  where: TrpcCallsWhereUniqueInputSchema,
}).strict()

export const TrpcCallsUpdateArgsSchema: z.ZodType<Prisma.TrpcCallsUpdateArgs> = z.object({
  select: TrpcCallsSelectSchema.optional(),
  data: z.union([ TrpcCallsUpdateInputSchema,TrpcCallsUncheckedUpdateInputSchema ]),
  where: TrpcCallsWhereUniqueInputSchema,
}).strict()

export const TrpcCallsUpdateManyArgsSchema: z.ZodType<Prisma.TrpcCallsUpdateManyArgs> = z.object({
  data: z.union([ TrpcCallsUpdateManyMutationInputSchema,TrpcCallsUncheckedUpdateManyInputSchema ]),
  where: TrpcCallsWhereInputSchema.optional(),
}).strict()

export const TrpcCallsDeleteManyArgsSchema: z.ZodType<Prisma.TrpcCallsDeleteManyArgs> = z.object({
  where: TrpcCallsWhereInputSchema.optional(),
}).strict()

interface ContactsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ContactsArgs
  readonly type: Prisma.ContactsGetPayload<this['_A']>
}

interface FavoriteContactsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.FavoriteContactsArgs
  readonly type: Prisma.FavoriteContactsGetPayload<this['_A']>
}

interface TrpcCallsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.TrpcCallsArgs
  readonly type: Prisma.TrpcCallsGetPayload<this['_A']>
}

export const tableSchemas = {
  contacts: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "first_name",
        "TEXT"
      ],
      [
        "last_name",
        "TEXT"
      ],
      [
        "website",
        "TEXT"
      ],
      [
        "avatar",
        "TEXT"
      ],
      [
        "notes",
        "TEXT"
      ]
    ]),
    relations: [
      new Relation("favorite_contacts", "", "", "favorite_contacts", "ContactsToFavoriteContacts", "many"),
    ],
    modelSchema: (ContactsCreateInputSchema as any)
      .partial()
      .or((ContactsUncheckedCreateInputSchema as any).partial()),
    createSchema: ContactsCreateArgsSchema,
    createManySchema: ContactsCreateManyArgsSchema,
    findUniqueSchema: ContactsFindUniqueArgsSchema,
    findSchema: ContactsFindFirstArgsSchema,
    updateSchema: ContactsUpdateArgsSchema,
    updateManySchema: ContactsUpdateManyArgsSchema,
    upsertSchema: ContactsUpsertArgsSchema,
    deleteSchema: ContactsDeleteArgsSchema,
    deleteManySchema: ContactsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof ContactsCreateInputSchema>,
    Prisma.ContactsCreateArgs['data'],
    Prisma.ContactsUpdateArgs['data'],
    Prisma.ContactsFindFirstArgs['select'],
    Prisma.ContactsFindFirstArgs['where'],
    Prisma.ContactsFindUniqueArgs['where'],
    Omit<Prisma.ContactsInclude, '_count'>,
    Prisma.ContactsFindFirstArgs['orderBy'],
    Prisma.ContactsScalarFieldEnum,
    ContactsGetPayload
  >,
  favorite_contacts: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "user_id",
        "UUID"
      ],
      [
        "contact_id",
        "UUID"
      ]
    ]),
    relations: [
      new Relation("contacts", "contact_id", "id", "contacts", "ContactsToFavoriteContacts", "one"),
    ],
    modelSchema: (FavoriteContactsCreateInputSchema as any)
      .partial()
      .or((FavoriteContactsUncheckedCreateInputSchema as any).partial()),
    createSchema: FavoriteContactsCreateArgsSchema,
    createManySchema: FavoriteContactsCreateManyArgsSchema,
    findUniqueSchema: FavoriteContactsFindUniqueArgsSchema,
    findSchema: FavoriteContactsFindFirstArgsSchema,
    updateSchema: FavoriteContactsUpdateArgsSchema,
    updateManySchema: FavoriteContactsUpdateManyArgsSchema,
    upsertSchema: FavoriteContactsUpsertArgsSchema,
    deleteSchema: FavoriteContactsDeleteArgsSchema,
    deleteManySchema: FavoriteContactsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof FavoriteContactsCreateInputSchema>,
    Prisma.FavoriteContactsCreateArgs['data'],
    Prisma.FavoriteContactsUpdateArgs['data'],
    Prisma.FavoriteContactsFindFirstArgs['select'],
    Prisma.FavoriteContactsFindFirstArgs['where'],
    Prisma.FavoriteContactsFindUniqueArgs['where'],
    Omit<Prisma.FavoriteContactsInclude, '_count'>,
    Prisma.FavoriteContactsFindFirstArgs['orderBy'],
    Prisma.FavoriteContactsScalarFieldEnum,
    FavoriteContactsGetPayload
  >,
  trpc_calls: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "createdat",
        "TIMESTAMPTZ"
      ],
      [
        "elapsedms",
        "INT4"
      ],
      [
        "path",
        "TEXT"
      ],
      [
        "input",
        "TEXT"
      ],
      [
        "type",
        "TEXT"
      ],
      [
        "state",
        "TEXT"
      ],
      [
        "clientid",
        "TEXT"
      ],
      [
        "response",
        "TEXT"
      ]
    ]),
    relations: [
    ],
    modelSchema: (TrpcCallsCreateInputSchema as any)
      .partial()
      .or((TrpcCallsUncheckedCreateInputSchema as any).partial()),
    createSchema: TrpcCallsCreateArgsSchema,
    createManySchema: TrpcCallsCreateManyArgsSchema,
    findUniqueSchema: TrpcCallsFindUniqueArgsSchema,
    findSchema: TrpcCallsFindFirstArgsSchema,
    updateSchema: TrpcCallsUpdateArgsSchema,
    updateManySchema: TrpcCallsUpdateManyArgsSchema,
    upsertSchema: TrpcCallsUpsertArgsSchema,
    deleteSchema: TrpcCallsDeleteArgsSchema,
    deleteManySchema: TrpcCallsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof TrpcCallsCreateInputSchema>,
    Prisma.TrpcCallsCreateArgs['data'],
    Prisma.TrpcCallsUpdateArgs['data'],
    Prisma.TrpcCallsFindFirstArgs['select'],
    Prisma.TrpcCallsFindFirstArgs['where'],
    Prisma.TrpcCallsFindUniqueArgs['where'],
    never,
    Prisma.TrpcCallsFindFirstArgs['orderBy'],
    Prisma.TrpcCallsScalarFieldEnum,
    TrpcCallsGetPayload
  >,
}

export const schema = new DbSchema(tableSchemas, migrations)
export type Electric = ElectricClient<typeof schema>

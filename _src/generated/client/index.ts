import { z } from 'zod';
import type { Prisma } from './prismaClient';
import { type TableSchema, DbSchema, Relation, ElectricClient, type HKT } from 'electric-sql/client/model';
import migrations from './migrations';
import pgMigrations from './pg-migrations';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const ContactsScalarFieldEnumSchema = z.enum(['id','first_name','last_name','website','avatar','notes']);

export const Favorite_contactsScalarFieldEnumSchema = z.enum(['id','user_id','contact_id']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);
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

export const Favorite_contactsSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  contact_id: z.string().uuid(),
})

export type Favorite_contacts = z.infer<typeof Favorite_contactsSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CONTACTS
//------------------------------------------------------

export const ContactsIncludeSchema: z.ZodType<Prisma.ContactsInclude> = z.object({
  favorite_contacts: z.union([z.boolean(),z.lazy(() => Favorite_contactsFindManyArgsSchema)]).optional(),
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
  favorite_contacts: z.union([z.boolean(),z.lazy(() => Favorite_contactsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ContactsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FAVORITE CONTACTS
//------------------------------------------------------

export const Favorite_contactsIncludeSchema: z.ZodType<Prisma.Favorite_contactsInclude> = z.object({
  contacts: z.union([z.boolean(),z.lazy(() => ContactsArgsSchema)]).optional(),
}).strict()

export const Favorite_contactsArgsSchema: z.ZodType<Prisma.Favorite_contactsArgs> = z.object({
  select: z.lazy(() => Favorite_contactsSelectSchema).optional(),
  include: z.lazy(() => Favorite_contactsIncludeSchema).optional(),
}).strict();

export const Favorite_contactsSelectSchema: z.ZodType<Prisma.Favorite_contactsSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  contact_id: z.boolean().optional(),
  contacts: z.union([z.boolean(),z.lazy(() => ContactsArgsSchema)]).optional(),
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
  favorite_contacts: z.lazy(() => Favorite_contactsListRelationFilterSchema).optional()
}).strict();

export const ContactsOrderByWithRelationInputSchema: z.ZodType<Prisma.ContactsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  website: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  favorite_contacts: z.lazy(() => Favorite_contactsOrderByRelationAggregateInputSchema).optional()
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

export const Favorite_contactsWhereInputSchema: z.ZodType<Prisma.Favorite_contactsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Favorite_contactsWhereInputSchema),z.lazy(() => Favorite_contactsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Favorite_contactsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Favorite_contactsWhereInputSchema),z.lazy(() => Favorite_contactsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  contact_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  contacts: z.union([ z.lazy(() => ContactsRelationFilterSchema),z.lazy(() => ContactsWhereInputSchema) ]).optional(),
}).strict();

export const Favorite_contactsOrderByWithRelationInputSchema: z.ZodType<Prisma.Favorite_contactsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => ContactsOrderByWithRelationInputSchema).optional()
}).strict();

export const Favorite_contactsWhereUniqueInputSchema: z.ZodType<Prisma.Favorite_contactsWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const Favorite_contactsOrderByWithAggregationInputSchema: z.ZodType<Prisma.Favorite_contactsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Favorite_contactsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Favorite_contactsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Favorite_contactsMinOrderByAggregateInputSchema).optional()
}).strict();

export const Favorite_contactsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Favorite_contactsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Favorite_contactsScalarWhereWithAggregatesInputSchema),z.lazy(() => Favorite_contactsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Favorite_contactsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Favorite_contactsScalarWhereWithAggregatesInputSchema),z.lazy(() => Favorite_contactsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  contact_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ContactsCreateInputSchema: z.ZodType<Prisma.ContactsCreateInput> = z.object({
  id: z.string().uuid(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  favorite_contacts: z.lazy(() => Favorite_contactsCreateNestedManyWithoutContactsInputSchema).optional()
}).strict();

export const ContactsUncheckedCreateInputSchema: z.ZodType<Prisma.ContactsUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  favorite_contacts: z.lazy(() => Favorite_contactsUncheckedCreateNestedManyWithoutContactsInputSchema).optional()
}).strict();

export const ContactsUpdateInputSchema: z.ZodType<Prisma.ContactsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  favorite_contacts: z.lazy(() => Favorite_contactsUpdateManyWithoutContactsNestedInputSchema).optional()
}).strict();

export const ContactsUncheckedUpdateInputSchema: z.ZodType<Prisma.ContactsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  favorite_contacts: z.lazy(() => Favorite_contactsUncheckedUpdateManyWithoutContactsNestedInputSchema).optional()
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

export const Favorite_contactsCreateInputSchema: z.ZodType<Prisma.Favorite_contactsCreateInput> = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  contacts: z.lazy(() => ContactsCreateNestedOneWithoutFavorite_contactsInputSchema)
}).strict();

export const Favorite_contactsUncheckedCreateInputSchema: z.ZodType<Prisma.Favorite_contactsUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  contact_id: z.string().uuid()
}).strict();

export const Favorite_contactsUpdateInputSchema: z.ZodType<Prisma.Favorite_contactsUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.lazy(() => ContactsUpdateOneRequiredWithoutFavorite_contactsNestedInputSchema).optional()
}).strict();

export const Favorite_contactsUncheckedUpdateInputSchema: z.ZodType<Prisma.Favorite_contactsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Favorite_contactsCreateManyInputSchema: z.ZodType<Prisma.Favorite_contactsCreateManyInput> = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  contact_id: z.string().uuid()
}).strict();

export const Favorite_contactsUpdateManyMutationInputSchema: z.ZodType<Prisma.Favorite_contactsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Favorite_contactsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Favorite_contactsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contact_id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const Favorite_contactsListRelationFilterSchema: z.ZodType<Prisma.Favorite_contactsListRelationFilter> = z.object({
  every: z.lazy(() => Favorite_contactsWhereInputSchema).optional(),
  some: z.lazy(() => Favorite_contactsWhereInputSchema).optional(),
  none: z.lazy(() => Favorite_contactsWhereInputSchema).optional()
}).strict();

export const Favorite_contactsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Favorite_contactsOrderByRelationAggregateInput> = z.object({
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

export const Favorite_contactsCountOrderByAggregateInputSchema: z.ZodType<Prisma.Favorite_contactsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Favorite_contactsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Favorite_contactsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Favorite_contactsMinOrderByAggregateInputSchema: z.ZodType<Prisma.Favorite_contactsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  contact_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Favorite_contactsCreateNestedManyWithoutContactsInputSchema: z.ZodType<Prisma.Favorite_contactsCreateNestedManyWithoutContactsInput> = z.object({
  create: z.union([ z.lazy(() => Favorite_contactsCreateWithoutContactsInputSchema),z.lazy(() => Favorite_contactsCreateWithoutContactsInputSchema).array(),z.lazy(() => Favorite_contactsUncheckedCreateWithoutContactsInputSchema),z.lazy(() => Favorite_contactsUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Favorite_contactsCreateOrConnectWithoutContactsInputSchema),z.lazy(() => Favorite_contactsCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Favorite_contactsCreateManyContactsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Favorite_contactsWhereUniqueInputSchema),z.lazy(() => Favorite_contactsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Favorite_contactsUncheckedCreateNestedManyWithoutContactsInputSchema: z.ZodType<Prisma.Favorite_contactsUncheckedCreateNestedManyWithoutContactsInput> = z.object({
  create: z.union([ z.lazy(() => Favorite_contactsCreateWithoutContactsInputSchema),z.lazy(() => Favorite_contactsCreateWithoutContactsInputSchema).array(),z.lazy(() => Favorite_contactsUncheckedCreateWithoutContactsInputSchema),z.lazy(() => Favorite_contactsUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Favorite_contactsCreateOrConnectWithoutContactsInputSchema),z.lazy(() => Favorite_contactsCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Favorite_contactsCreateManyContactsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Favorite_contactsWhereUniqueInputSchema),z.lazy(() => Favorite_contactsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const Favorite_contactsUpdateManyWithoutContactsNestedInputSchema: z.ZodType<Prisma.Favorite_contactsUpdateManyWithoutContactsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Favorite_contactsCreateWithoutContactsInputSchema),z.lazy(() => Favorite_contactsCreateWithoutContactsInputSchema).array(),z.lazy(() => Favorite_contactsUncheckedCreateWithoutContactsInputSchema),z.lazy(() => Favorite_contactsUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Favorite_contactsCreateOrConnectWithoutContactsInputSchema),z.lazy(() => Favorite_contactsCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Favorite_contactsUpsertWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => Favorite_contactsUpsertWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Favorite_contactsCreateManyContactsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Favorite_contactsWhereUniqueInputSchema),z.lazy(() => Favorite_contactsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Favorite_contactsWhereUniqueInputSchema),z.lazy(() => Favorite_contactsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Favorite_contactsWhereUniqueInputSchema),z.lazy(() => Favorite_contactsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Favorite_contactsWhereUniqueInputSchema),z.lazy(() => Favorite_contactsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Favorite_contactsUpdateWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => Favorite_contactsUpdateWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Favorite_contactsUpdateManyWithWhereWithoutContactsInputSchema),z.lazy(() => Favorite_contactsUpdateManyWithWhereWithoutContactsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Favorite_contactsScalarWhereInputSchema),z.lazy(() => Favorite_contactsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Favorite_contactsUncheckedUpdateManyWithoutContactsNestedInputSchema: z.ZodType<Prisma.Favorite_contactsUncheckedUpdateManyWithoutContactsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Favorite_contactsCreateWithoutContactsInputSchema),z.lazy(() => Favorite_contactsCreateWithoutContactsInputSchema).array(),z.lazy(() => Favorite_contactsUncheckedCreateWithoutContactsInputSchema),z.lazy(() => Favorite_contactsUncheckedCreateWithoutContactsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Favorite_contactsCreateOrConnectWithoutContactsInputSchema),z.lazy(() => Favorite_contactsCreateOrConnectWithoutContactsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Favorite_contactsUpsertWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => Favorite_contactsUpsertWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Favorite_contactsCreateManyContactsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Favorite_contactsWhereUniqueInputSchema),z.lazy(() => Favorite_contactsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Favorite_contactsWhereUniqueInputSchema),z.lazy(() => Favorite_contactsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Favorite_contactsWhereUniqueInputSchema),z.lazy(() => Favorite_contactsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Favorite_contactsWhereUniqueInputSchema),z.lazy(() => Favorite_contactsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Favorite_contactsUpdateWithWhereUniqueWithoutContactsInputSchema),z.lazy(() => Favorite_contactsUpdateWithWhereUniqueWithoutContactsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Favorite_contactsUpdateManyWithWhereWithoutContactsInputSchema),z.lazy(() => Favorite_contactsUpdateManyWithWhereWithoutContactsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Favorite_contactsScalarWhereInputSchema),z.lazy(() => Favorite_contactsScalarWhereInputSchema).array() ]).optional(),
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

export const Favorite_contactsCreateWithoutContactsInputSchema: z.ZodType<Prisma.Favorite_contactsCreateWithoutContactsInput> = z.object({
  id: z.string(),
  user_id: z.string()
}).strict();

export const Favorite_contactsUncheckedCreateWithoutContactsInputSchema: z.ZodType<Prisma.Favorite_contactsUncheckedCreateWithoutContactsInput> = z.object({
  id: z.string(),
  user_id: z.string()
}).strict();

export const Favorite_contactsCreateOrConnectWithoutContactsInputSchema: z.ZodType<Prisma.Favorite_contactsCreateOrConnectWithoutContactsInput> = z.object({
  where: z.lazy(() => Favorite_contactsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Favorite_contactsCreateWithoutContactsInputSchema),z.lazy(() => Favorite_contactsUncheckedCreateWithoutContactsInputSchema) ]),
}).strict();

export const Favorite_contactsCreateManyContactsInputEnvelopeSchema: z.ZodType<Prisma.Favorite_contactsCreateManyContactsInputEnvelope> = z.object({
  data: z.lazy(() => Favorite_contactsCreateManyContactsInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Favorite_contactsUpsertWithWhereUniqueWithoutContactsInputSchema: z.ZodType<Prisma.Favorite_contactsUpsertWithWhereUniqueWithoutContactsInput> = z.object({
  where: z.lazy(() => Favorite_contactsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Favorite_contactsUpdateWithoutContactsInputSchema),z.lazy(() => Favorite_contactsUncheckedUpdateWithoutContactsInputSchema) ]),
  create: z.union([ z.lazy(() => Favorite_contactsCreateWithoutContactsInputSchema),z.lazy(() => Favorite_contactsUncheckedCreateWithoutContactsInputSchema) ]),
}).strict();

export const Favorite_contactsUpdateWithWhereUniqueWithoutContactsInputSchema: z.ZodType<Prisma.Favorite_contactsUpdateWithWhereUniqueWithoutContactsInput> = z.object({
  where: z.lazy(() => Favorite_contactsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Favorite_contactsUpdateWithoutContactsInputSchema),z.lazy(() => Favorite_contactsUncheckedUpdateWithoutContactsInputSchema) ]),
}).strict();

export const Favorite_contactsUpdateManyWithWhereWithoutContactsInputSchema: z.ZodType<Prisma.Favorite_contactsUpdateManyWithWhereWithoutContactsInput> = z.object({
  where: z.lazy(() => Favorite_contactsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Favorite_contactsUpdateManyMutationInputSchema),z.lazy(() => Favorite_contactsUncheckedUpdateManyWithoutFavorite_contactsInputSchema) ]),
}).strict();

export const Favorite_contactsScalarWhereInputSchema: z.ZodType<Prisma.Favorite_contactsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Favorite_contactsScalarWhereInputSchema),z.lazy(() => Favorite_contactsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Favorite_contactsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Favorite_contactsScalarWhereInputSchema),z.lazy(() => Favorite_contactsScalarWhereInputSchema).array() ]).optional(),
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

export const Favorite_contactsCreateManyContactsInputSchema: z.ZodType<Prisma.Favorite_contactsCreateManyContactsInput> = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid()
}).strict();

export const Favorite_contactsUpdateWithoutContactsInputSchema: z.ZodType<Prisma.Favorite_contactsUpdateWithoutContactsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Favorite_contactsUncheckedUpdateWithoutContactsInputSchema: z.ZodType<Prisma.Favorite_contactsUncheckedUpdateWithoutContactsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Favorite_contactsUncheckedUpdateManyWithoutFavorite_contactsInputSchema: z.ZodType<Prisma.Favorite_contactsUncheckedUpdateManyWithoutFavorite_contactsInput> = z.object({
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
}).strict() as z.ZodType<Prisma.ContactsFindFirstArgs>

export const ContactsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ContactsFindFirstOrThrowArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereInputSchema.optional(),
  orderBy: z.union([ ContactsOrderByWithRelationInputSchema.array(),ContactsOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ContactsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ContactsFindFirstOrThrowArgs>

export const ContactsFindManyArgsSchema: z.ZodType<Prisma.ContactsFindManyArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereInputSchema.optional(),
  orderBy: z.union([ ContactsOrderByWithRelationInputSchema.array(),ContactsOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ContactsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ContactsFindManyArgs>

export const ContactsAggregateArgsSchema: z.ZodType<Prisma.ContactsAggregateArgs> = z.object({
  where: ContactsWhereInputSchema.optional(),
  orderBy: z.union([ ContactsOrderByWithRelationInputSchema.array(),ContactsOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ContactsAggregateArgs>

export const ContactsGroupByArgsSchema: z.ZodType<Prisma.ContactsGroupByArgs> = z.object({
  where: ContactsWhereInputSchema.optional(),
  orderBy: z.union([ ContactsOrderByWithAggregationInputSchema.array(),ContactsOrderByWithAggregationInputSchema ]).optional(),
  by: ContactsScalarFieldEnumSchema.array(),
  having: ContactsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ContactsGroupByArgs>

export const ContactsFindUniqueArgsSchema: z.ZodType<Prisma.ContactsFindUniqueArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ContactsFindUniqueArgs>

export const ContactsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ContactsFindUniqueOrThrowArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ContactsFindUniqueOrThrowArgs>

export const Favorite_contactsFindFirstArgsSchema: z.ZodType<Prisma.Favorite_contactsFindFirstArgs> = z.object({
  select: Favorite_contactsSelectSchema.optional(),
  include: Favorite_contactsIncludeSchema.optional(),
  where: Favorite_contactsWhereInputSchema.optional(),
  orderBy: z.union([ Favorite_contactsOrderByWithRelationInputSchema.array(),Favorite_contactsOrderByWithRelationInputSchema ]).optional(),
  cursor: Favorite_contactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Favorite_contactsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Favorite_contactsFindFirstArgs>

export const Favorite_contactsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Favorite_contactsFindFirstOrThrowArgs> = z.object({
  select: Favorite_contactsSelectSchema.optional(),
  include: Favorite_contactsIncludeSchema.optional(),
  where: Favorite_contactsWhereInputSchema.optional(),
  orderBy: z.union([ Favorite_contactsOrderByWithRelationInputSchema.array(),Favorite_contactsOrderByWithRelationInputSchema ]).optional(),
  cursor: Favorite_contactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Favorite_contactsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Favorite_contactsFindFirstOrThrowArgs>

export const Favorite_contactsFindManyArgsSchema: z.ZodType<Prisma.Favorite_contactsFindManyArgs> = z.object({
  select: Favorite_contactsSelectSchema.optional(),
  include: Favorite_contactsIncludeSchema.optional(),
  where: Favorite_contactsWhereInputSchema.optional(),
  orderBy: z.union([ Favorite_contactsOrderByWithRelationInputSchema.array(),Favorite_contactsOrderByWithRelationInputSchema ]).optional(),
  cursor: Favorite_contactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Favorite_contactsScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Favorite_contactsFindManyArgs>

export const Favorite_contactsAggregateArgsSchema: z.ZodType<Prisma.Favorite_contactsAggregateArgs> = z.object({
  where: Favorite_contactsWhereInputSchema.optional(),
  orderBy: z.union([ Favorite_contactsOrderByWithRelationInputSchema.array(),Favorite_contactsOrderByWithRelationInputSchema ]).optional(),
  cursor: Favorite_contactsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.Favorite_contactsAggregateArgs>

export const Favorite_contactsGroupByArgsSchema: z.ZodType<Prisma.Favorite_contactsGroupByArgs> = z.object({
  where: Favorite_contactsWhereInputSchema.optional(),
  orderBy: z.union([ Favorite_contactsOrderByWithAggregationInputSchema.array(),Favorite_contactsOrderByWithAggregationInputSchema ]).optional(),
  by: Favorite_contactsScalarFieldEnumSchema.array(),
  having: Favorite_contactsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.Favorite_contactsGroupByArgs>

export const Favorite_contactsFindUniqueArgsSchema: z.ZodType<Prisma.Favorite_contactsFindUniqueArgs> = z.object({
  select: Favorite_contactsSelectSchema.optional(),
  include: Favorite_contactsIncludeSchema.optional(),
  where: Favorite_contactsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Favorite_contactsFindUniqueArgs>

export const Favorite_contactsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Favorite_contactsFindUniqueOrThrowArgs> = z.object({
  select: Favorite_contactsSelectSchema.optional(),
  include: Favorite_contactsIncludeSchema.optional(),
  where: Favorite_contactsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Favorite_contactsFindUniqueOrThrowArgs>

export const ContactsCreateArgsSchema: z.ZodType<Prisma.ContactsCreateArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  data: z.union([ ContactsCreateInputSchema,ContactsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ContactsCreateArgs>

export const ContactsUpsertArgsSchema: z.ZodType<Prisma.ContactsUpsertArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereUniqueInputSchema,
  create: z.union([ ContactsCreateInputSchema,ContactsUncheckedCreateInputSchema ]),
  update: z.union([ ContactsUpdateInputSchema,ContactsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ContactsUpsertArgs>

export const ContactsCreateManyArgsSchema: z.ZodType<Prisma.ContactsCreateManyArgs> = z.object({
  data: ContactsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ContactsCreateManyArgs>

export const ContactsDeleteArgsSchema: z.ZodType<Prisma.ContactsDeleteArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  where: ContactsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ContactsDeleteArgs>

export const ContactsUpdateArgsSchema: z.ZodType<Prisma.ContactsUpdateArgs> = z.object({
  select: ContactsSelectSchema.optional(),
  include: ContactsIncludeSchema.optional(),
  data: z.union([ ContactsUpdateInputSchema,ContactsUncheckedUpdateInputSchema ]),
  where: ContactsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ContactsUpdateArgs>

export const ContactsUpdateManyArgsSchema: z.ZodType<Prisma.ContactsUpdateManyArgs> = z.object({
  data: z.union([ ContactsUpdateManyMutationInputSchema,ContactsUncheckedUpdateManyInputSchema ]),
  where: ContactsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ContactsUpdateManyArgs>

export const ContactsDeleteManyArgsSchema: z.ZodType<Prisma.ContactsDeleteManyArgs> = z.object({
  where: ContactsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ContactsDeleteManyArgs>

export const Favorite_contactsCreateArgsSchema: z.ZodType<Prisma.Favorite_contactsCreateArgs> = z.object({
  select: Favorite_contactsSelectSchema.optional(),
  include: Favorite_contactsIncludeSchema.optional(),
  data: z.union([ Favorite_contactsCreateInputSchema,Favorite_contactsUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.Favorite_contactsCreateArgs>

export const Favorite_contactsUpsertArgsSchema: z.ZodType<Prisma.Favorite_contactsUpsertArgs> = z.object({
  select: Favorite_contactsSelectSchema.optional(),
  include: Favorite_contactsIncludeSchema.optional(),
  where: Favorite_contactsWhereUniqueInputSchema,
  create: z.union([ Favorite_contactsCreateInputSchema,Favorite_contactsUncheckedCreateInputSchema ]),
  update: z.union([ Favorite_contactsUpdateInputSchema,Favorite_contactsUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.Favorite_contactsUpsertArgs>

export const Favorite_contactsCreateManyArgsSchema: z.ZodType<Prisma.Favorite_contactsCreateManyArgs> = z.object({
  data: Favorite_contactsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.Favorite_contactsCreateManyArgs>

export const Favorite_contactsDeleteArgsSchema: z.ZodType<Prisma.Favorite_contactsDeleteArgs> = z.object({
  select: Favorite_contactsSelectSchema.optional(),
  include: Favorite_contactsIncludeSchema.optional(),
  where: Favorite_contactsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Favorite_contactsDeleteArgs>

export const Favorite_contactsUpdateArgsSchema: z.ZodType<Prisma.Favorite_contactsUpdateArgs> = z.object({
  select: Favorite_contactsSelectSchema.optional(),
  include: Favorite_contactsIncludeSchema.optional(),
  data: z.union([ Favorite_contactsUpdateInputSchema,Favorite_contactsUncheckedUpdateInputSchema ]),
  where: Favorite_contactsWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Favorite_contactsUpdateArgs>

export const Favorite_contactsUpdateManyArgsSchema: z.ZodType<Prisma.Favorite_contactsUpdateManyArgs> = z.object({
  data: z.union([ Favorite_contactsUpdateManyMutationInputSchema,Favorite_contactsUncheckedUpdateManyInputSchema ]),
  where: Favorite_contactsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.Favorite_contactsUpdateManyArgs>

export const Favorite_contactsDeleteManyArgsSchema: z.ZodType<Prisma.Favorite_contactsDeleteManyArgs> = z.object({
  where: Favorite_contactsWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.Favorite_contactsDeleteManyArgs>

interface ContactsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ContactsArgs
  readonly type: Omit<Prisma.ContactsGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface Favorite_contactsGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.Favorite_contactsArgs
  readonly type: Omit<Prisma.Favorite_contactsGetPayload<this['_A']>, "Please either choose `select` or `include`">
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
      new Relation("favorite_contacts", "", "", "favorite_contacts", "ContactsToFavorite_contacts", "many"),
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
    z.infer<typeof ContactsUncheckedCreateInputSchema>,
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
      new Relation("contacts", "contact_id", "id", "contacts", "ContactsToFavorite_contacts", "one"),
    ],
    modelSchema: (Favorite_contactsCreateInputSchema as any)
      .partial()
      .or((Favorite_contactsUncheckedCreateInputSchema as any).partial()),
    createSchema: Favorite_contactsCreateArgsSchema,
    createManySchema: Favorite_contactsCreateManyArgsSchema,
    findUniqueSchema: Favorite_contactsFindUniqueArgsSchema,
    findSchema: Favorite_contactsFindFirstArgsSchema,
    updateSchema: Favorite_contactsUpdateArgsSchema,
    updateManySchema: Favorite_contactsUpdateManyArgsSchema,
    upsertSchema: Favorite_contactsUpsertArgsSchema,
    deleteSchema: Favorite_contactsDeleteArgsSchema,
    deleteManySchema: Favorite_contactsDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof Favorite_contactsUncheckedCreateInputSchema>,
    Prisma.Favorite_contactsCreateArgs['data'],
    Prisma.Favorite_contactsUpdateArgs['data'],
    Prisma.Favorite_contactsFindFirstArgs['select'],
    Prisma.Favorite_contactsFindFirstArgs['where'],
    Prisma.Favorite_contactsFindUniqueArgs['where'],
    Omit<Prisma.Favorite_contactsInclude, '_count'>,
    Prisma.Favorite_contactsFindFirstArgs['orderBy'],
    Prisma.Favorite_contactsScalarFieldEnum,
    Favorite_contactsGetPayload
  >,
}

export const schema = new DbSchema(tableSchemas, migrations, pgMigrations)
export type Electric = ElectricClient<typeof schema>

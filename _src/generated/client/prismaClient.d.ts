
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Contacts
 * 
 */
export type Contacts = {
  /**
   * @zod.string.uuid()
   */
  id: string
  first_name: string | null
  last_name: string | null
  website: string | null
  avatar: string | null
  notes: string | null
}

/**
 * Model Favorite_contacts
 * 
 */
export type Favorite_contacts = {
  /**
   * @zod.string.uuid()
   */
  id: string
  /**
   * @zod.string.uuid()
   */
  user_id: string
  /**
   * @zod.string.uuid()
   */
  contact_id: string
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Contacts
 * const contacts = await prisma.contacts.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Contacts
   * const contacts = await prisma.contacts.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: {maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel}): Promise<R>;

      /**
   * `prisma.contacts`: Exposes CRUD operations for the **Contacts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contacts
    * const contacts = await prisma.contacts.findMany()
    * ```
    */
  get contacts(): Prisma.ContactsDelegate<GlobalReject>;

  /**
   * `prisma.favorite_contacts`: Exposes CRUD operations for the **Favorite_contacts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Favorite_contacts
    * const favorite_contacts = await prisma.favorite_contacts.findMany()
    * ```
    */
  get favorite_contacts(): Prisma.Favorite_contactsDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.8.1
   * Query Engine version: d6e67a83f971b175a593ccc12e15c4a757f93ffe
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
export type InputJsonValue = null | string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Contacts: 'Contacts',
    Favorite_contacts: 'Favorite_contacts'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ContactsCountOutputType
   */


  export type ContactsCountOutputType = {
    favorite_contacts: number
  }

  export type ContactsCountOutputTypeSelect = {
    favorite_contacts?: boolean
  }

  export type ContactsCountOutputTypeGetPayload<S extends boolean | null | undefined | ContactsCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ContactsCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (ContactsCountOutputTypeArgs)
    ? ContactsCountOutputType 
    : S extends { select: any } & (ContactsCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof ContactsCountOutputType ? ContactsCountOutputType[P] : never
  } 
      : ContactsCountOutputType




  // Custom InputTypes

  /**
   * ContactsCountOutputType without action
   */
  export type ContactsCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ContactsCountOutputType
     * 
    **/
    select?: ContactsCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Contacts
   */


  export type AggregateContacts = {
    _count: ContactsCountAggregateOutputType | null
    _min: ContactsMinAggregateOutputType | null
    _max: ContactsMaxAggregateOutputType | null
  }

  export type ContactsMinAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    website: string | null
    avatar: string | null
    notes: string | null
  }

  export type ContactsMaxAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    website: string | null
    avatar: string | null
    notes: string | null
  }

  export type ContactsCountAggregateOutputType = {
    id: number
    first_name: number
    last_name: number
    website: number
    avatar: number
    notes: number
    _all: number
  }


  export type ContactsMinAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    website?: true
    avatar?: true
    notes?: true
  }

  export type ContactsMaxAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    website?: true
    avatar?: true
    notes?: true
  }

  export type ContactsCountAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    website?: true
    avatar?: true
    notes?: true
    _all?: true
  }

  export type ContactsAggregateArgs = {
    /**
     * Filter which Contacts to aggregate.
     * 
    **/
    where?: ContactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<ContactsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ContactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contacts
    **/
    _count?: true | ContactsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactsMaxAggregateInputType
  }

  export type GetContactsAggregateType<T extends ContactsAggregateArgs> = {
        [P in keyof T & keyof AggregateContacts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContacts[P]>
      : GetScalarType<T[P], AggregateContacts[P]>
  }




  export type ContactsGroupByArgs = {
    where?: ContactsWhereInput
    orderBy?: Enumerable<ContactsOrderByWithAggregationInput>
    by: Array<ContactsScalarFieldEnum>
    having?: ContactsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactsCountAggregateInputType | true
    _min?: ContactsMinAggregateInputType
    _max?: ContactsMaxAggregateInputType
  }


  export type ContactsGroupByOutputType = {
    id: string
    first_name: string | null
    last_name: string | null
    website: string | null
    avatar: string | null
    notes: string | null
    _count: ContactsCountAggregateOutputType | null
    _min: ContactsMinAggregateOutputType | null
    _max: ContactsMaxAggregateOutputType | null
  }

  type GetContactsGroupByPayload<T extends ContactsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ContactsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactsGroupByOutputType[P]>
            : GetScalarType<T[P], ContactsGroupByOutputType[P]>
        }
      >
    >


  export type ContactsSelect = {
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    website?: boolean
    avatar?: boolean
    notes?: boolean
    favorite_contacts?: boolean | Contacts$favorite_contactsArgs
    _count?: boolean | ContactsCountOutputTypeArgs
  }


  export type ContactsInclude = {
    favorite_contacts?: boolean | Contacts$favorite_contactsArgs
    _count?: boolean | ContactsCountOutputTypeArgs
  } 

  export type ContactsGetPayload<S extends boolean | null | undefined | ContactsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Contacts :
    S extends undefined ? never :
    S extends { include: any } & (ContactsArgs | ContactsFindManyArgs)
    ? Contacts  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'favorite_contacts' ? Array < Favorite_contactsGetPayload<S['include'][P]>>  :
        P extends '_count' ? ContactsCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ContactsArgs | ContactsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'favorite_contacts' ? Array < Favorite_contactsGetPayload<S['select'][P]>>  :
        P extends '_count' ? ContactsCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Contacts ? Contacts[P] : never
  } 
      : Contacts


  type ContactsCountArgs = Merge<
    Omit<ContactsFindManyArgs, 'select' | 'include'> & {
      select?: ContactsCountAggregateInputType | true
    }
  >

  export interface ContactsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Contacts that matches the filter.
     * @param {ContactsFindUniqueArgs} args - Arguments to find a Contacts
     * @example
     * // Get one Contacts
     * const contacts = await prisma.contacts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ContactsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ContactsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Contacts'> extends True ? Prisma__ContactsClient<ContactsGetPayload<T>> : Prisma__ContactsClient<ContactsGetPayload<T> | null, null>

    /**
     * Find one Contacts that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ContactsFindUniqueOrThrowArgs} args - Arguments to find a Contacts
     * @example
     * // Get one Contacts
     * const contacts = await prisma.contacts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ContactsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ContactsFindUniqueOrThrowArgs>
    ): Prisma__ContactsClient<ContactsGetPayload<T>>

    /**
     * Find the first Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactsFindFirstArgs} args - Arguments to find a Contacts
     * @example
     * // Get one Contacts
     * const contacts = await prisma.contacts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ContactsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ContactsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Contacts'> extends True ? Prisma__ContactsClient<ContactsGetPayload<T>> : Prisma__ContactsClient<ContactsGetPayload<T> | null, null>

    /**
     * Find the first Contacts that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactsFindFirstOrThrowArgs} args - Arguments to find a Contacts
     * @example
     * // Get one Contacts
     * const contacts = await prisma.contacts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ContactsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ContactsFindFirstOrThrowArgs>
    ): Prisma__ContactsClient<ContactsGetPayload<T>>

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contacts.findMany()
     * 
     * // Get first 10 Contacts
     * const contacts = await prisma.contacts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactsWithIdOnly = await prisma.contacts.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ContactsFindManyArgs>(
      args?: SelectSubset<T, ContactsFindManyArgs>
    ): PrismaPromise<Array<ContactsGetPayload<T>>>

    /**
     * Create a Contacts.
     * @param {ContactsCreateArgs} args - Arguments to create a Contacts.
     * @example
     * // Create one Contacts
     * const Contacts = await prisma.contacts.create({
     *   data: {
     *     // ... data to create a Contacts
     *   }
     * })
     * 
    **/
    create<T extends ContactsCreateArgs>(
      args: SelectSubset<T, ContactsCreateArgs>
    ): Prisma__ContactsClient<ContactsGetPayload<T>>

    /**
     * Create many Contacts.
     *     @param {ContactsCreateManyArgs} args - Arguments to create many Contacts.
     *     @example
     *     // Create many Contacts
     *     const contacts = await prisma.contacts.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ContactsCreateManyArgs>(
      args?: SelectSubset<T, ContactsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Contacts.
     * @param {ContactsDeleteArgs} args - Arguments to delete one Contacts.
     * @example
     * // Delete one Contacts
     * const Contacts = await prisma.contacts.delete({
     *   where: {
     *     // ... filter to delete one Contacts
     *   }
     * })
     * 
    **/
    delete<T extends ContactsDeleteArgs>(
      args: SelectSubset<T, ContactsDeleteArgs>
    ): Prisma__ContactsClient<ContactsGetPayload<T>>

    /**
     * Update one Contacts.
     * @param {ContactsUpdateArgs} args - Arguments to update one Contacts.
     * @example
     * // Update one Contacts
     * const contacts = await prisma.contacts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ContactsUpdateArgs>(
      args: SelectSubset<T, ContactsUpdateArgs>
    ): Prisma__ContactsClient<ContactsGetPayload<T>>

    /**
     * Delete zero or more Contacts.
     * @param {ContactsDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contacts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ContactsDeleteManyArgs>(
      args?: SelectSubset<T, ContactsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contacts = await prisma.contacts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ContactsUpdateManyArgs>(
      args: SelectSubset<T, ContactsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Contacts.
     * @param {ContactsUpsertArgs} args - Arguments to update or create a Contacts.
     * @example
     * // Update or create a Contacts
     * const contacts = await prisma.contacts.upsert({
     *   create: {
     *     // ... data to create a Contacts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contacts we want to update
     *   }
     * })
    **/
    upsert<T extends ContactsUpsertArgs>(
      args: SelectSubset<T, ContactsUpsertArgs>
    ): Prisma__ContactsClient<ContactsGetPayload<T>>

    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactsCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contacts.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
    **/
    count<T extends ContactsCountArgs>(
      args?: Subset<T, ContactsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactsAggregateArgs>(args: Subset<T, ContactsAggregateArgs>): PrismaPromise<GetContactsAggregateType<T>>

    /**
     * Group by Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactsGroupByArgs['orderBy'] }
        : { orderBy?: ContactsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Contacts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ContactsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    favorite_contacts<T extends Contacts$favorite_contactsArgs= {}>(args?: Subset<T, Contacts$favorite_contactsArgs>): PrismaPromise<Array<Favorite_contactsGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Contacts base type for findUnique actions
   */
  export type ContactsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * Filter, which Contacts to fetch.
     * 
    **/
    where: ContactsWhereUniqueInput
  }

  /**
   * Contacts findUnique
   */
  export interface ContactsFindUniqueArgs extends ContactsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Contacts findUniqueOrThrow
   */
  export type ContactsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * Filter, which Contacts to fetch.
     * 
    **/
    where: ContactsWhereUniqueInput
  }


  /**
   * Contacts base type for findFirst actions
   */
  export type ContactsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * Filter, which Contacts to fetch.
     * 
    **/
    where?: ContactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<ContactsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     * 
    **/
    cursor?: ContactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     * 
    **/
    distinct?: Enumerable<ContactsScalarFieldEnum>
  }

  /**
   * Contacts findFirst
   */
  export interface ContactsFindFirstArgs extends ContactsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Contacts findFirstOrThrow
   */
  export type ContactsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * Filter, which Contacts to fetch.
     * 
    **/
    where?: ContactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<ContactsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     * 
    **/
    cursor?: ContactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     * 
    **/
    distinct?: Enumerable<ContactsScalarFieldEnum>
  }


  /**
   * Contacts findMany
   */
  export type ContactsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * Filter, which Contacts to fetch.
     * 
    **/
    where?: ContactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<ContactsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contacts.
     * 
    **/
    cursor?: ContactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ContactsScalarFieldEnum>
  }


  /**
   * Contacts create
   */
  export type ContactsCreateArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * The data needed to create a Contacts.
     * 
    **/
    data: XOR<ContactsCreateInput, ContactsUncheckedCreateInput>
  }


  /**
   * Contacts createMany
   */
  export type ContactsCreateManyArgs = {
    /**
     * The data used to create many Contacts.
     * 
    **/
    data: Enumerable<ContactsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Contacts update
   */
  export type ContactsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * The data needed to update a Contacts.
     * 
    **/
    data: XOR<ContactsUpdateInput, ContactsUncheckedUpdateInput>
    /**
     * Choose, which Contacts to update.
     * 
    **/
    where: ContactsWhereUniqueInput
  }


  /**
   * Contacts updateMany
   */
  export type ContactsUpdateManyArgs = {
    /**
     * The data used to update Contacts.
     * 
    **/
    data: XOR<ContactsUpdateManyMutationInput, ContactsUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     * 
    **/
    where?: ContactsWhereInput
  }


  /**
   * Contacts upsert
   */
  export type ContactsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * The filter to search for the Contacts to update in case it exists.
     * 
    **/
    where: ContactsWhereUniqueInput
    /**
     * In case the Contacts found by the `where` argument doesn't exist, create a new Contacts with this data.
     * 
    **/
    create: XOR<ContactsCreateInput, ContactsUncheckedCreateInput>
    /**
     * In case the Contacts was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ContactsUpdateInput, ContactsUncheckedUpdateInput>
  }


  /**
   * Contacts delete
   */
  export type ContactsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
    /**
     * Filter which Contacts to delete.
     * 
    **/
    where: ContactsWhereUniqueInput
  }


  /**
   * Contacts deleteMany
   */
  export type ContactsDeleteManyArgs = {
    /**
     * Filter which Contacts to delete
     * 
    **/
    where?: ContactsWhereInput
  }


  /**
   * Contacts.favorite_contacts
   */
  export type Contacts$favorite_contactsArgs = {
    /**
     * Select specific fields to fetch from the Favorite_contacts
     * 
    **/
    select?: Favorite_contactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Favorite_contactsInclude | null
    where?: Favorite_contactsWhereInput
    orderBy?: Enumerable<Favorite_contactsOrderByWithRelationInput>
    cursor?: Favorite_contactsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Favorite_contactsScalarFieldEnum>
  }


  /**
   * Contacts without action
   */
  export type ContactsArgs = {
    /**
     * Select specific fields to fetch from the Contacts
     * 
    **/
    select?: ContactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactsInclude | null
  }



  /**
   * Model Favorite_contacts
   */


  export type AggregateFavorite_contacts = {
    _count: Favorite_contactsCountAggregateOutputType | null
    _min: Favorite_contactsMinAggregateOutputType | null
    _max: Favorite_contactsMaxAggregateOutputType | null
  }

  export type Favorite_contactsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    contact_id: string | null
  }

  export type Favorite_contactsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    contact_id: string | null
  }

  export type Favorite_contactsCountAggregateOutputType = {
    id: number
    user_id: number
    contact_id: number
    _all: number
  }


  export type Favorite_contactsMinAggregateInputType = {
    id?: true
    user_id?: true
    contact_id?: true
  }

  export type Favorite_contactsMaxAggregateInputType = {
    id?: true
    user_id?: true
    contact_id?: true
  }

  export type Favorite_contactsCountAggregateInputType = {
    id?: true
    user_id?: true
    contact_id?: true
    _all?: true
  }

  export type Favorite_contactsAggregateArgs = {
    /**
     * Filter which Favorite_contacts to aggregate.
     * 
    **/
    where?: Favorite_contactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorite_contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<Favorite_contactsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: Favorite_contactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorite_contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorite_contacts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Favorite_contacts
    **/
    _count?: true | Favorite_contactsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Favorite_contactsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Favorite_contactsMaxAggregateInputType
  }

  export type GetFavorite_contactsAggregateType<T extends Favorite_contactsAggregateArgs> = {
        [P in keyof T & keyof AggregateFavorite_contacts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavorite_contacts[P]>
      : GetScalarType<T[P], AggregateFavorite_contacts[P]>
  }




  export type Favorite_contactsGroupByArgs = {
    where?: Favorite_contactsWhereInput
    orderBy?: Enumerable<Favorite_contactsOrderByWithAggregationInput>
    by: Array<Favorite_contactsScalarFieldEnum>
    having?: Favorite_contactsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Favorite_contactsCountAggregateInputType | true
    _min?: Favorite_contactsMinAggregateInputType
    _max?: Favorite_contactsMaxAggregateInputType
  }


  export type Favorite_contactsGroupByOutputType = {
    id: string
    user_id: string
    contact_id: string
    _count: Favorite_contactsCountAggregateOutputType | null
    _min: Favorite_contactsMinAggregateOutputType | null
    _max: Favorite_contactsMaxAggregateOutputType | null
  }

  type GetFavorite_contactsGroupByPayload<T extends Favorite_contactsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Favorite_contactsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Favorite_contactsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Favorite_contactsGroupByOutputType[P]>
            : GetScalarType<T[P], Favorite_contactsGroupByOutputType[P]>
        }
      >
    >


  export type Favorite_contactsSelect = {
    id?: boolean
    user_id?: boolean
    contact_id?: boolean
    contacts?: boolean | ContactsArgs
  }


  export type Favorite_contactsInclude = {
    contacts?: boolean | ContactsArgs
  } 

  export type Favorite_contactsGetPayload<S extends boolean | null | undefined | Favorite_contactsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Favorite_contacts :
    S extends undefined ? never :
    S extends { include: any } & (Favorite_contactsArgs | Favorite_contactsFindManyArgs)
    ? Favorite_contacts  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'contacts' ? ContactsGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (Favorite_contactsArgs | Favorite_contactsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'contacts' ? ContactsGetPayload<S['select'][P]> :  P extends keyof Favorite_contacts ? Favorite_contacts[P] : never
  } 
      : Favorite_contacts


  type Favorite_contactsCountArgs = Merge<
    Omit<Favorite_contactsFindManyArgs, 'select' | 'include'> & {
      select?: Favorite_contactsCountAggregateInputType | true
    }
  >

  export interface Favorite_contactsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Favorite_contacts that matches the filter.
     * @param {Favorite_contactsFindUniqueArgs} args - Arguments to find a Favorite_contacts
     * @example
     * // Get one Favorite_contacts
     * const favorite_contacts = await prisma.favorite_contacts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Favorite_contactsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, Favorite_contactsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Favorite_contacts'> extends True ? Prisma__Favorite_contactsClient<Favorite_contactsGetPayload<T>> : Prisma__Favorite_contactsClient<Favorite_contactsGetPayload<T> | null, null>

    /**
     * Find one Favorite_contacts that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Favorite_contactsFindUniqueOrThrowArgs} args - Arguments to find a Favorite_contacts
     * @example
     * // Get one Favorite_contacts
     * const favorite_contacts = await prisma.favorite_contacts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Favorite_contactsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, Favorite_contactsFindUniqueOrThrowArgs>
    ): Prisma__Favorite_contactsClient<Favorite_contactsGetPayload<T>>

    /**
     * Find the first Favorite_contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Favorite_contactsFindFirstArgs} args - Arguments to find a Favorite_contacts
     * @example
     * // Get one Favorite_contacts
     * const favorite_contacts = await prisma.favorite_contacts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Favorite_contactsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, Favorite_contactsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Favorite_contacts'> extends True ? Prisma__Favorite_contactsClient<Favorite_contactsGetPayload<T>> : Prisma__Favorite_contactsClient<Favorite_contactsGetPayload<T> | null, null>

    /**
     * Find the first Favorite_contacts that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Favorite_contactsFindFirstOrThrowArgs} args - Arguments to find a Favorite_contacts
     * @example
     * // Get one Favorite_contacts
     * const favorite_contacts = await prisma.favorite_contacts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Favorite_contactsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, Favorite_contactsFindFirstOrThrowArgs>
    ): Prisma__Favorite_contactsClient<Favorite_contactsGetPayload<T>>

    /**
     * Find zero or more Favorite_contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Favorite_contactsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Favorite_contacts
     * const favorite_contacts = await prisma.favorite_contacts.findMany()
     * 
     * // Get first 10 Favorite_contacts
     * const favorite_contacts = await prisma.favorite_contacts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const favorite_contactsWithIdOnly = await prisma.favorite_contacts.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends Favorite_contactsFindManyArgs>(
      args?: SelectSubset<T, Favorite_contactsFindManyArgs>
    ): PrismaPromise<Array<Favorite_contactsGetPayload<T>>>

    /**
     * Create a Favorite_contacts.
     * @param {Favorite_contactsCreateArgs} args - Arguments to create a Favorite_contacts.
     * @example
     * // Create one Favorite_contacts
     * const Favorite_contacts = await prisma.favorite_contacts.create({
     *   data: {
     *     // ... data to create a Favorite_contacts
     *   }
     * })
     * 
    **/
    create<T extends Favorite_contactsCreateArgs>(
      args: SelectSubset<T, Favorite_contactsCreateArgs>
    ): Prisma__Favorite_contactsClient<Favorite_contactsGetPayload<T>>

    /**
     * Create many Favorite_contacts.
     *     @param {Favorite_contactsCreateManyArgs} args - Arguments to create many Favorite_contacts.
     *     @example
     *     // Create many Favorite_contacts
     *     const favorite_contacts = await prisma.favorite_contacts.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Favorite_contactsCreateManyArgs>(
      args?: SelectSubset<T, Favorite_contactsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Favorite_contacts.
     * @param {Favorite_contactsDeleteArgs} args - Arguments to delete one Favorite_contacts.
     * @example
     * // Delete one Favorite_contacts
     * const Favorite_contacts = await prisma.favorite_contacts.delete({
     *   where: {
     *     // ... filter to delete one Favorite_contacts
     *   }
     * })
     * 
    **/
    delete<T extends Favorite_contactsDeleteArgs>(
      args: SelectSubset<T, Favorite_contactsDeleteArgs>
    ): Prisma__Favorite_contactsClient<Favorite_contactsGetPayload<T>>

    /**
     * Update one Favorite_contacts.
     * @param {Favorite_contactsUpdateArgs} args - Arguments to update one Favorite_contacts.
     * @example
     * // Update one Favorite_contacts
     * const favorite_contacts = await prisma.favorite_contacts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Favorite_contactsUpdateArgs>(
      args: SelectSubset<T, Favorite_contactsUpdateArgs>
    ): Prisma__Favorite_contactsClient<Favorite_contactsGetPayload<T>>

    /**
     * Delete zero or more Favorite_contacts.
     * @param {Favorite_contactsDeleteManyArgs} args - Arguments to filter Favorite_contacts to delete.
     * @example
     * // Delete a few Favorite_contacts
     * const { count } = await prisma.favorite_contacts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Favorite_contactsDeleteManyArgs>(
      args?: SelectSubset<T, Favorite_contactsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorite_contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Favorite_contactsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Favorite_contacts
     * const favorite_contacts = await prisma.favorite_contacts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Favorite_contactsUpdateManyArgs>(
      args: SelectSubset<T, Favorite_contactsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Favorite_contacts.
     * @param {Favorite_contactsUpsertArgs} args - Arguments to update or create a Favorite_contacts.
     * @example
     * // Update or create a Favorite_contacts
     * const favorite_contacts = await prisma.favorite_contacts.upsert({
     *   create: {
     *     // ... data to create a Favorite_contacts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Favorite_contacts we want to update
     *   }
     * })
    **/
    upsert<T extends Favorite_contactsUpsertArgs>(
      args: SelectSubset<T, Favorite_contactsUpsertArgs>
    ): Prisma__Favorite_contactsClient<Favorite_contactsGetPayload<T>>

    /**
     * Count the number of Favorite_contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Favorite_contactsCountArgs} args - Arguments to filter Favorite_contacts to count.
     * @example
     * // Count the number of Favorite_contacts
     * const count = await prisma.favorite_contacts.count({
     *   where: {
     *     // ... the filter for the Favorite_contacts we want to count
     *   }
     * })
    **/
    count<T extends Favorite_contactsCountArgs>(
      args?: Subset<T, Favorite_contactsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Favorite_contactsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Favorite_contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Favorite_contactsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Favorite_contactsAggregateArgs>(args: Subset<T, Favorite_contactsAggregateArgs>): PrismaPromise<GetFavorite_contactsAggregateType<T>>

    /**
     * Group by Favorite_contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Favorite_contactsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Favorite_contactsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Favorite_contactsGroupByArgs['orderBy'] }
        : { orderBy?: Favorite_contactsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Favorite_contactsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavorite_contactsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Favorite_contacts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__Favorite_contactsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    contacts<T extends ContactsArgs= {}>(args?: Subset<T, ContactsArgs>): Prisma__ContactsClient<ContactsGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Favorite_contacts base type for findUnique actions
   */
  export type Favorite_contactsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Favorite_contacts
     * 
    **/
    select?: Favorite_contactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Favorite_contactsInclude | null
    /**
     * Filter, which Favorite_contacts to fetch.
     * 
    **/
    where: Favorite_contactsWhereUniqueInput
  }

  /**
   * Favorite_contacts findUnique
   */
  export interface Favorite_contactsFindUniqueArgs extends Favorite_contactsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Favorite_contacts findUniqueOrThrow
   */
  export type Favorite_contactsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Favorite_contacts
     * 
    **/
    select?: Favorite_contactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Favorite_contactsInclude | null
    /**
     * Filter, which Favorite_contacts to fetch.
     * 
    **/
    where: Favorite_contactsWhereUniqueInput
  }


  /**
   * Favorite_contacts base type for findFirst actions
   */
  export type Favorite_contactsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Favorite_contacts
     * 
    **/
    select?: Favorite_contactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Favorite_contactsInclude | null
    /**
     * Filter, which Favorite_contacts to fetch.
     * 
    **/
    where?: Favorite_contactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorite_contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<Favorite_contactsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorite_contacts.
     * 
    **/
    cursor?: Favorite_contactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorite_contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorite_contacts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorite_contacts.
     * 
    **/
    distinct?: Enumerable<Favorite_contactsScalarFieldEnum>
  }

  /**
   * Favorite_contacts findFirst
   */
  export interface Favorite_contactsFindFirstArgs extends Favorite_contactsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Favorite_contacts findFirstOrThrow
   */
  export type Favorite_contactsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Favorite_contacts
     * 
    **/
    select?: Favorite_contactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Favorite_contactsInclude | null
    /**
     * Filter, which Favorite_contacts to fetch.
     * 
    **/
    where?: Favorite_contactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorite_contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<Favorite_contactsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorite_contacts.
     * 
    **/
    cursor?: Favorite_contactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorite_contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorite_contacts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorite_contacts.
     * 
    **/
    distinct?: Enumerable<Favorite_contactsScalarFieldEnum>
  }


  /**
   * Favorite_contacts findMany
   */
  export type Favorite_contactsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Favorite_contacts
     * 
    **/
    select?: Favorite_contactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Favorite_contactsInclude | null
    /**
     * Filter, which Favorite_contacts to fetch.
     * 
    **/
    where?: Favorite_contactsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorite_contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<Favorite_contactsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Favorite_contacts.
     * 
    **/
    cursor?: Favorite_contactsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorite_contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorite_contacts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Favorite_contactsScalarFieldEnum>
  }


  /**
   * Favorite_contacts create
   */
  export type Favorite_contactsCreateArgs = {
    /**
     * Select specific fields to fetch from the Favorite_contacts
     * 
    **/
    select?: Favorite_contactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Favorite_contactsInclude | null
    /**
     * The data needed to create a Favorite_contacts.
     * 
    **/
    data: XOR<Favorite_contactsCreateInput, Favorite_contactsUncheckedCreateInput>
  }


  /**
   * Favorite_contacts createMany
   */
  export type Favorite_contactsCreateManyArgs = {
    /**
     * The data used to create many Favorite_contacts.
     * 
    **/
    data: Enumerable<Favorite_contactsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Favorite_contacts update
   */
  export type Favorite_contactsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Favorite_contacts
     * 
    **/
    select?: Favorite_contactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Favorite_contactsInclude | null
    /**
     * The data needed to update a Favorite_contacts.
     * 
    **/
    data: XOR<Favorite_contactsUpdateInput, Favorite_contactsUncheckedUpdateInput>
    /**
     * Choose, which Favorite_contacts to update.
     * 
    **/
    where: Favorite_contactsWhereUniqueInput
  }


  /**
   * Favorite_contacts updateMany
   */
  export type Favorite_contactsUpdateManyArgs = {
    /**
     * The data used to update Favorite_contacts.
     * 
    **/
    data: XOR<Favorite_contactsUpdateManyMutationInput, Favorite_contactsUncheckedUpdateManyInput>
    /**
     * Filter which Favorite_contacts to update
     * 
    **/
    where?: Favorite_contactsWhereInput
  }


  /**
   * Favorite_contacts upsert
   */
  export type Favorite_contactsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Favorite_contacts
     * 
    **/
    select?: Favorite_contactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Favorite_contactsInclude | null
    /**
     * The filter to search for the Favorite_contacts to update in case it exists.
     * 
    **/
    where: Favorite_contactsWhereUniqueInput
    /**
     * In case the Favorite_contacts found by the `where` argument doesn't exist, create a new Favorite_contacts with this data.
     * 
    **/
    create: XOR<Favorite_contactsCreateInput, Favorite_contactsUncheckedCreateInput>
    /**
     * In case the Favorite_contacts was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<Favorite_contactsUpdateInput, Favorite_contactsUncheckedUpdateInput>
  }


  /**
   * Favorite_contacts delete
   */
  export type Favorite_contactsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Favorite_contacts
     * 
    **/
    select?: Favorite_contactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Favorite_contactsInclude | null
    /**
     * Filter which Favorite_contacts to delete.
     * 
    **/
    where: Favorite_contactsWhereUniqueInput
  }


  /**
   * Favorite_contacts deleteMany
   */
  export type Favorite_contactsDeleteManyArgs = {
    /**
     * Filter which Favorite_contacts to delete
     * 
    **/
    where?: Favorite_contactsWhereInput
  }


  /**
   * Favorite_contacts without action
   */
  export type Favorite_contactsArgs = {
    /**
     * Select specific fields to fetch from the Favorite_contacts
     * 
    **/
    select?: Favorite_contactsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Favorite_contactsInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const ContactsScalarFieldEnum: {
    id: 'id',
    first_name: 'first_name',
    last_name: 'last_name',
    website: 'website',
    avatar: 'avatar',
    notes: 'notes'
  };

  export type ContactsScalarFieldEnum = (typeof ContactsScalarFieldEnum)[keyof typeof ContactsScalarFieldEnum]


  export const Favorite_contactsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    contact_id: 'contact_id'
  };

  export type Favorite_contactsScalarFieldEnum = (typeof Favorite_contactsScalarFieldEnum)[keyof typeof Favorite_contactsScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  /**
   * Deep Input Types
   */


  export type ContactsWhereInput = {
    AND?: Enumerable<ContactsWhereInput>
    OR?: Enumerable<ContactsWhereInput>
    NOT?: Enumerable<ContactsWhereInput>
    id?: UuidFilter | string
    first_name?: StringNullableFilter | string | null
    last_name?: StringNullableFilter | string | null
    website?: StringNullableFilter | string | null
    avatar?: StringNullableFilter | string | null
    notes?: StringNullableFilter | string | null
    favorite_contacts?: Favorite_contactsListRelationFilter
  }

  export type ContactsOrderByWithRelationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    website?: SortOrder
    avatar?: SortOrder
    notes?: SortOrder
    favorite_contacts?: Favorite_contactsOrderByRelationAggregateInput
  }

  export type ContactsWhereUniqueInput = {
    id?: string
  }

  export type ContactsOrderByWithAggregationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    website?: SortOrder
    avatar?: SortOrder
    notes?: SortOrder
    _count?: ContactsCountOrderByAggregateInput
    _max?: ContactsMaxOrderByAggregateInput
    _min?: ContactsMinOrderByAggregateInput
  }

  export type ContactsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ContactsScalarWhereWithAggregatesInput>
    OR?: Enumerable<ContactsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ContactsScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    first_name?: StringNullableWithAggregatesFilter | string | null
    last_name?: StringNullableWithAggregatesFilter | string | null
    website?: StringNullableWithAggregatesFilter | string | null
    avatar?: StringNullableWithAggregatesFilter | string | null
    notes?: StringNullableWithAggregatesFilter | string | null
  }

  export type Favorite_contactsWhereInput = {
    AND?: Enumerable<Favorite_contactsWhereInput>
    OR?: Enumerable<Favorite_contactsWhereInput>
    NOT?: Enumerable<Favorite_contactsWhereInput>
    id?: UuidFilter | string
    user_id?: UuidFilter | string
    contact_id?: UuidFilter | string
    contacts?: XOR<ContactsRelationFilter, ContactsWhereInput>
  }

  export type Favorite_contactsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    contact_id?: SortOrder
    contacts?: ContactsOrderByWithRelationInput
  }

  export type Favorite_contactsWhereUniqueInput = {
    id?: string
  }

  export type Favorite_contactsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    contact_id?: SortOrder
    _count?: Favorite_contactsCountOrderByAggregateInput
    _max?: Favorite_contactsMaxOrderByAggregateInput
    _min?: Favorite_contactsMinOrderByAggregateInput
  }

  export type Favorite_contactsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<Favorite_contactsScalarWhereWithAggregatesInput>
    OR?: Enumerable<Favorite_contactsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<Favorite_contactsScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    user_id?: UuidWithAggregatesFilter | string
    contact_id?: UuidWithAggregatesFilter | string
  }

  export type ContactsCreateInput = {
    id: string
    first_name?: string | null
    last_name?: string | null
    website?: string | null
    avatar?: string | null
    notes?: string | null
    favorite_contacts?: Favorite_contactsCreateNestedManyWithoutContactsInput
  }

  export type ContactsUncheckedCreateInput = {
    id: string
    first_name?: string | null
    last_name?: string | null
    website?: string | null
    avatar?: string | null
    notes?: string | null
    favorite_contacts?: Favorite_contactsUncheckedCreateNestedManyWithoutContactsInput
  }

  export type ContactsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    favorite_contacts?: Favorite_contactsUpdateManyWithoutContactsNestedInput
  }

  export type ContactsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    favorite_contacts?: Favorite_contactsUncheckedUpdateManyWithoutContactsNestedInput
  }

  export type ContactsCreateManyInput = {
    id: string
    first_name?: string | null
    last_name?: string | null
    website?: string | null
    avatar?: string | null
    notes?: string | null
  }

  export type ContactsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContactsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Favorite_contactsCreateInput = {
    id: string
    user_id: string
    contacts: ContactsCreateNestedOneWithoutFavorite_contactsInput
  }

  export type Favorite_contactsUncheckedCreateInput = {
    id: string
    user_id: string
    contact_id: string
  }

  export type Favorite_contactsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    contacts?: ContactsUpdateOneRequiredWithoutFavorite_contactsNestedInput
  }

  export type Favorite_contactsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    contact_id?: StringFieldUpdateOperationsInput | string
  }

  export type Favorite_contactsCreateManyInput = {
    id: string
    user_id: string
    contact_id: string
  }

  export type Favorite_contactsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type Favorite_contactsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    contact_id?: StringFieldUpdateOperationsInput | string
  }

  export type UuidFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type Favorite_contactsListRelationFilter = {
    every?: Favorite_contactsWhereInput
    some?: Favorite_contactsWhereInput
    none?: Favorite_contactsWhereInput
  }

  export type Favorite_contactsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContactsCountOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    website?: SortOrder
    avatar?: SortOrder
    notes?: SortOrder
  }

  export type ContactsMaxOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    website?: SortOrder
    avatar?: SortOrder
    notes?: SortOrder
  }

  export type ContactsMinOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    website?: SortOrder
    avatar?: SortOrder
    notes?: SortOrder
  }

  export type UuidWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type ContactsRelationFilter = {
    is?: ContactsWhereInput
    isNot?: ContactsWhereInput
  }

  export type Favorite_contactsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    contact_id?: SortOrder
  }

  export type Favorite_contactsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    contact_id?: SortOrder
  }

  export type Favorite_contactsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    contact_id?: SortOrder
  }

  export type Favorite_contactsCreateNestedManyWithoutContactsInput = {
    create?: XOR<Enumerable<Favorite_contactsCreateWithoutContactsInput>, Enumerable<Favorite_contactsUncheckedCreateWithoutContactsInput>>
    connectOrCreate?: Enumerable<Favorite_contactsCreateOrConnectWithoutContactsInput>
    createMany?: Favorite_contactsCreateManyContactsInputEnvelope
    connect?: Enumerable<Favorite_contactsWhereUniqueInput>
  }

  export type Favorite_contactsUncheckedCreateNestedManyWithoutContactsInput = {
    create?: XOR<Enumerable<Favorite_contactsCreateWithoutContactsInput>, Enumerable<Favorite_contactsUncheckedCreateWithoutContactsInput>>
    connectOrCreate?: Enumerable<Favorite_contactsCreateOrConnectWithoutContactsInput>
    createMany?: Favorite_contactsCreateManyContactsInputEnvelope
    connect?: Enumerable<Favorite_contactsWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type Favorite_contactsUpdateManyWithoutContactsNestedInput = {
    create?: XOR<Enumerable<Favorite_contactsCreateWithoutContactsInput>, Enumerable<Favorite_contactsUncheckedCreateWithoutContactsInput>>
    connectOrCreate?: Enumerable<Favorite_contactsCreateOrConnectWithoutContactsInput>
    upsert?: Enumerable<Favorite_contactsUpsertWithWhereUniqueWithoutContactsInput>
    createMany?: Favorite_contactsCreateManyContactsInputEnvelope
    set?: Enumerable<Favorite_contactsWhereUniqueInput>
    disconnect?: Enumerable<Favorite_contactsWhereUniqueInput>
    delete?: Enumerable<Favorite_contactsWhereUniqueInput>
    connect?: Enumerable<Favorite_contactsWhereUniqueInput>
    update?: Enumerable<Favorite_contactsUpdateWithWhereUniqueWithoutContactsInput>
    updateMany?: Enumerable<Favorite_contactsUpdateManyWithWhereWithoutContactsInput>
    deleteMany?: Enumerable<Favorite_contactsScalarWhereInput>
  }

  export type Favorite_contactsUncheckedUpdateManyWithoutContactsNestedInput = {
    create?: XOR<Enumerable<Favorite_contactsCreateWithoutContactsInput>, Enumerable<Favorite_contactsUncheckedCreateWithoutContactsInput>>
    connectOrCreate?: Enumerable<Favorite_contactsCreateOrConnectWithoutContactsInput>
    upsert?: Enumerable<Favorite_contactsUpsertWithWhereUniqueWithoutContactsInput>
    createMany?: Favorite_contactsCreateManyContactsInputEnvelope
    set?: Enumerable<Favorite_contactsWhereUniqueInput>
    disconnect?: Enumerable<Favorite_contactsWhereUniqueInput>
    delete?: Enumerable<Favorite_contactsWhereUniqueInput>
    connect?: Enumerable<Favorite_contactsWhereUniqueInput>
    update?: Enumerable<Favorite_contactsUpdateWithWhereUniqueWithoutContactsInput>
    updateMany?: Enumerable<Favorite_contactsUpdateManyWithWhereWithoutContactsInput>
    deleteMany?: Enumerable<Favorite_contactsScalarWhereInput>
  }

  export type ContactsCreateNestedOneWithoutFavorite_contactsInput = {
    create?: XOR<ContactsCreateWithoutFavorite_contactsInput, ContactsUncheckedCreateWithoutFavorite_contactsInput>
    connectOrCreate?: ContactsCreateOrConnectWithoutFavorite_contactsInput
    connect?: ContactsWhereUniqueInput
  }

  export type ContactsUpdateOneRequiredWithoutFavorite_contactsNestedInput = {
    create?: XOR<ContactsCreateWithoutFavorite_contactsInput, ContactsUncheckedCreateWithoutFavorite_contactsInput>
    connectOrCreate?: ContactsCreateOrConnectWithoutFavorite_contactsInput
    upsert?: ContactsUpsertWithoutFavorite_contactsInput
    connect?: ContactsWhereUniqueInput
    update?: XOR<ContactsUpdateWithoutFavorite_contactsInput, ContactsUncheckedUpdateWithoutFavorite_contactsInput>
  }

  export type NestedUuidFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedUuidWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type Favorite_contactsCreateWithoutContactsInput = {
    id: string
    user_id: string
  }

  export type Favorite_contactsUncheckedCreateWithoutContactsInput = {
    id: string
    user_id: string
  }

  export type Favorite_contactsCreateOrConnectWithoutContactsInput = {
    where: Favorite_contactsWhereUniqueInput
    create: XOR<Favorite_contactsCreateWithoutContactsInput, Favorite_contactsUncheckedCreateWithoutContactsInput>
  }

  export type Favorite_contactsCreateManyContactsInputEnvelope = {
    data: Enumerable<Favorite_contactsCreateManyContactsInput>
    skipDuplicates?: boolean
  }

  export type Favorite_contactsUpsertWithWhereUniqueWithoutContactsInput = {
    where: Favorite_contactsWhereUniqueInput
    update: XOR<Favorite_contactsUpdateWithoutContactsInput, Favorite_contactsUncheckedUpdateWithoutContactsInput>
    create: XOR<Favorite_contactsCreateWithoutContactsInput, Favorite_contactsUncheckedCreateWithoutContactsInput>
  }

  export type Favorite_contactsUpdateWithWhereUniqueWithoutContactsInput = {
    where: Favorite_contactsWhereUniqueInput
    data: XOR<Favorite_contactsUpdateWithoutContactsInput, Favorite_contactsUncheckedUpdateWithoutContactsInput>
  }

  export type Favorite_contactsUpdateManyWithWhereWithoutContactsInput = {
    where: Favorite_contactsScalarWhereInput
    data: XOR<Favorite_contactsUpdateManyMutationInput, Favorite_contactsUncheckedUpdateManyWithoutFavorite_contactsInput>
  }

  export type Favorite_contactsScalarWhereInput = {
    AND?: Enumerable<Favorite_contactsScalarWhereInput>
    OR?: Enumerable<Favorite_contactsScalarWhereInput>
    NOT?: Enumerable<Favorite_contactsScalarWhereInput>
    id?: UuidFilter | string
    user_id?: UuidFilter | string
    contact_id?: UuidFilter | string
  }

  export type ContactsCreateWithoutFavorite_contactsInput = {
    id: string
    first_name?: string | null
    last_name?: string | null
    website?: string | null
    avatar?: string | null
    notes?: string | null
  }

  export type ContactsUncheckedCreateWithoutFavorite_contactsInput = {
    id: string
    first_name?: string | null
    last_name?: string | null
    website?: string | null
    avatar?: string | null
    notes?: string | null
  }

  export type ContactsCreateOrConnectWithoutFavorite_contactsInput = {
    where: ContactsWhereUniqueInput
    create: XOR<ContactsCreateWithoutFavorite_contactsInput, ContactsUncheckedCreateWithoutFavorite_contactsInput>
  }

  export type ContactsUpsertWithoutFavorite_contactsInput = {
    update: XOR<ContactsUpdateWithoutFavorite_contactsInput, ContactsUncheckedUpdateWithoutFavorite_contactsInput>
    create: XOR<ContactsCreateWithoutFavorite_contactsInput, ContactsUncheckedCreateWithoutFavorite_contactsInput>
  }

  export type ContactsUpdateWithoutFavorite_contactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContactsUncheckedUpdateWithoutFavorite_contactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Favorite_contactsCreateManyContactsInput = {
    id: string
    user_id: string
  }

  export type Favorite_contactsUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type Favorite_contactsUncheckedUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type Favorite_contactsUncheckedUpdateManyWithoutFavorite_contactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}

type Buffer = Omit<Uint8Array, 'set'>

import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
import type { ExternalBlob } from "@caffeineai/object-storage";
export type { ExternalBlob } from "@caffeineai/object-storage";
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface ArticleInput {
    status: ArticleStatus;
    title: string;
    readingTime: bigint;
    body: string;
    publishedDate: string;
    slug?: string;
    tags: Array<string>;
    authorName: string;
    authorRole: string;
    coverImage?: ExternalBlob;
    excerpt: string;
    coverAlt: string;
}
export interface Article {
    status: ArticleStatus;
    title: string;
    readingTime: bigint;
    body: string;
    publishedDate: string;
    slug: string;
    tags: Array<string>;
    authorName: string;
    authorRole: string;
    coverImage?: ExternalBlob;
    excerpt: string;
    coverAlt: string;
}
export enum ArticleStatus {
    published = "published",
    draft = "draft"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createArticle(input: ArticleInput): Promise<Article>;
    deleteArticle(slug: string): Promise<Article | null>;
    getAllTags(): Promise<Array<string>>;
    getArticle(slug: string): Promise<Article | null>;
    getArticlesByTag(tag: string | null): Promise<Array<Article>>;
    getCallerUserRole(): Promise<UserRole>;
    getLatestArticles(count: bigint): Promise<Array<Article>>;
    getPublishedArticle(slug: string): Promise<Article | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllArticles(): Promise<Array<Article>>;
    listPublishedArticles(): Promise<Array<Article>>;
    updateArticle(slug: string, input: ArticleInput): Promise<Article | null>;
}

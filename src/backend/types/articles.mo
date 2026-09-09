import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  /// Mirror of the frontend `Article` type from
  /// `src/frontend/src/data/articles.ts`.
  ///
  /// `coverImage` is an off-chain object-storage reference (ExternalBlob),
  /// not a `Text` URL — the frontend uploads the cover via the
  /// object-storage extension and stores the resulting blob reference here.
  public type Article = {
    slug : Text;
    title : Text;
    excerpt : Text;
    /// HTML body content, rendered inside a `prose` container on the frontend.
    body : Text;
    coverImage : ?Storage.ExternalBlob;
    coverAlt : Text;
    authorName : Text;
    authorRole : Text;
    /// ISO date string (YYYY-MM-DD).
    publishedDate : Text;
    /// Reading time in minutes.
    readingTime : Nat;
    tags : [Text];
    status : Common.ArticleStatus;
  };

  /// Input payload for creating a new article. The backend generates the
  /// slug from `title` (with a uniqueness check) when `slug` is not
  /// supplied.
  public type ArticleInput = {
    slug : ?Text;
    title : Text;
    excerpt : Text;
    body : Text;
    coverImage : ?Storage.ExternalBlob;
    coverAlt : Text;
    authorName : Text;
    authorRole : Text;
    publishedDate : Text;
    readingTime : Nat;
    tags : [Text];
    status : Common.ArticleStatus;
  };
};

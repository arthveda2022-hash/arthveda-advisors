import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/articles";
import Articles "../lib/articles";

mixin (
  accessControlState : AccessControl.AccessControlState,
  articles : Map.Map<Text, Types.Article>,
) {
  /// List all published articles (public, anonymous-readable).
  public query func listPublishedArticles() : async [Types.Article] {
    Articles.listPublished(articles);
  };

  /// Get a single published article by slug (public).
  /// Returns null if the slug does not exist or the article is a draft.
  public query func getPublishedArticle(slug : Text) : async ?Types.Article {
    switch (Articles.getBySlug(articles, slug)) {
      case (?a) {
        if (a.status == #published) { ?a } else { null };
      };
      case null { null };
    };
  };

  /// Get the N most recent published articles (public).
  public query func getLatestArticles(count : Nat) : async [Types.Article] {
    Articles.getLatest(articles, count);
  };

  /// Get published articles that include the given tag (public).
  /// An empty/null tag returns all published articles.
  public query func getArticlesByTag(tag : ?Text) : async [Types.Article] {
    Articles.getByTag(articles, tag);
  };

  /// Get all unique tags across published articles, in stable display
  /// order (public).
  public query func getAllTags() : async [Text] {
    Articles.allTags(articles);
  };

  /// List all articles including drafts (admin only).
  public shared ({ caller }) func listAllArticles() : async [Types.Article] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    Articles.listAll(articles);
  };

  /// Get any article by slug including drafts (admin only).
  public shared ({ caller }) func getArticle(slug : Text) : async ?Types.Article {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    Articles.getBySlug(articles, slug);
  };

  /// Create a new article (admin only). The slug is auto-generated from
  /// the title with a uniqueness check when not supplied.
  public shared ({ caller }) func createArticle(input : Types.ArticleInput) : async Types.Article {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let slug = switch (input.slug) {
      case (?s) { Articles.ensureUniqueSlug(articles, s) };
      case null { Articles.ensureUniqueSlug(articles, Articles.slugify(input.title)) };
    };
    let article : Types.Article = {
      slug;
      title = input.title;
      excerpt = input.excerpt;
      body = input.body;
      coverImage = input.coverImage;
      coverAlt = input.coverAlt;
      authorName = input.authorName;
      authorRole = input.authorRole;
      publishedDate = input.publishedDate;
      readingTime = input.readingTime;
      tags = input.tags;
      status = input.status;
    };
    Articles.upsert(articles, article);
    article;
  };

  /// Update an existing article by slug (admin only).
  public shared ({ caller }) func updateArticle(slug : Text, input : Types.ArticleInput) : async ?Types.Article {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    switch (Articles.getBySlug(articles, slug)) {
      case null { null };
      case (?existing) {
        let newSlug = switch (input.slug) {
          case (?s) { s };
          case null { slug };
        };
        let updated : Types.Article = {
          slug = newSlug;
          title = input.title;
          excerpt = input.excerpt;
          body = input.body;
          coverImage = input.coverImage;
          coverAlt = input.coverAlt;
          authorName = input.authorName;
          authorRole = input.authorRole;
          publishedDate = input.publishedDate;
          readingTime = input.readingTime;
          tags = input.tags;
          status = input.status;
        };
        if (newSlug != slug) {
          ignore Articles.deleteBySlug(articles, slug);
        };
        Articles.upsert(articles, updated);
        ?updated;
      };
    };
  };

  /// Delete an article by slug (admin only). Returns the deleted
  /// article, if any.
  public shared ({ caller }) func deleteArticle(slug : Text) : async ?Types.Article {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    Articles.deleteBySlug(articles, slug);
  };
};

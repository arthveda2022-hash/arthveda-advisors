import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Types "../types/articles";
import Common "../types/common";

module {
  /// Generate a URL-safe slug from a title.
  /// Lowercases, replaces non-alphanumeric runs with a single hyphen,
  /// and trims leading/trailing hyphens.
  public func slugify(title : Text) : Text {
    let lowered = title.toLower();
    let chars = lowered.chars();
    let parts = chars.toArray();
    let folded = parts.foldLeft(
      "",
      func(acc : Text, c : Char) : Text {
        let isAlnum = (c >= 'a' and c <= 'z') or (c >= '0' and c <= '9');
        if (isAlnum) {
          acc # Char.toText(c);
        } else {
          if (acc.endsWith(#text "-")) { acc } else { acc # "-" };
        };
      },
    );
    let trimmed = folded.trim(#text "-");
    trimmed;
  };

  /// Ensure a slug is unique within the articles map; if it collides,
  /// append `-2`, `-3`, ... until a free key is found.
  public func ensureUniqueSlug(articles : Map.Map<Text, Types.Article>, slug : Text) : Text {
    if (articles.get(slug) == null) { return slug };
    var i : Nat = 2;
    loop {
      let candidate = slug # "-" # i.toText();
      if (articles.get(candidate) == null) { return candidate };
      i += 1;
    };
  };

  /// Return only articles whose status is `#published`.
  public func listPublished(articles : Map.Map<Text, Types.Article>) : [Types.Article] {
    Iter.toArray(
      articles.values().filter(func(a : Types.Article) : Bool {
        a.status == #published;
      })
    );
  };

  /// Return all articles regardless of status (admin use only).
  public func listAll(articles : Map.Map<Text, Types.Article>) : [Types.Article] {
    articles.values().toArray();
  };

  /// Look up a single article by slug.
  public func getBySlug(articles : Map.Map<Text, Types.Article>, slug : Text) : ?Types.Article {
    articles.get(slug);
  };

  /// Return the N most recently published articles (newest first by
  /// `publishedDate`).
  public func getLatest(articles : Map.Map<Text, Types.Article>, count : Nat) : [Types.Article] {
    let published = listPublished(articles);
    let sorted = published.sort(
      func(a : Types.Article, b : Types.Article) : {
        #less;
        #equal;
        #greater;
      } {
        Text.compare(b.publishedDate, a.publishedDate);
      },
    );
    if (sorted.size() <= count) { sorted } else { Array.tabulate(count, func(i : Nat) : Types.Article { sorted[i] }) };
  };

  /// Return published articles that include the given tag (case-sensitive).
  /// An empty/null tag returns all published articles.
  public func getByTag(articles : Map.Map<Text, Types.Article>, tag : ?Text) : [Types.Article] {
    switch (tag) {
      case null { listPublished(articles) };
      case (?t) {
        if (t == "") { return listPublished(articles) };
        Iter.toArray(
          articles.values().filter(func(a : Types.Article) : Bool {
            a.status == #published and a.tags.find(func(x : Text) : Bool { x == t }) != null;
          })
        );
      };
    };
  };

  /// Return the set of unique tags across published articles, in stable
  /// display order (first-seen).
  public func allTags(articles : Map.Map<Text, Types.Article>) : [Text] {
    let published = listPublished(articles);
    published.foldLeft(
      [],
      func(acc : [Text], a : Types.Article) : [Text] {
        a.tags.foldLeft(
          acc,
          func(inner : [Text], t : Text) : [Text] {
            if (inner.find(func(x : Text) : Bool { x == t }) != null) { inner } else { Array.tabulate(inner.size() + 1, func(i : Nat) : Text { if (i < inner.size()) { inner[i] } else { t } }) };
          },
        );
      },
    );
  };

  /// Insert or replace an article keyed by its slug.
  public func upsert(articles : Map.Map<Text, Types.Article>, article : Types.Article) : () {
    articles.add(article.slug, article);
  };

  /// Remove an article by slug. Returns the removed article, if any.
  public func deleteBySlug(articles : Map.Map<Text, Types.Article>, slug : Text) : ?Types.Article {
    let removed = articles.get(slug);
    articles.remove(slug);
    removed;
  };
};

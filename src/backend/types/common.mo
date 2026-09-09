module {
  /// Unix timestamp in nanoseconds (matches `Time.now()`).
  public type Timestamp = Nat;

  /// Publication status of an article.
  /// `#draft` articles are never returned by public read methods.
  public type ArticleStatus = {
    #draft;
    #published;
  };
};

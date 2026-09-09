import Common "common";
import OQL "mo:caffeineai-oql";

module {
  /// `_toRow` for `Common.ArticleStatus` — converts the `#draft` /
  /// `#published` variant into a single `OQL.Value` text variant so the
  /// column is queryable (`eq value "published"`).
  public func _toRow(self : Common.ArticleStatus) : OQL.Value {
    #text(
      switch (self) {
        case (#draft) "draft";
        case (#published) "published";
      }
    );
  };
};

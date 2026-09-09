import OQL "mo:caffeineai-oql";

module {
  /// `_toRow` for `[Text]` — converts a list of tags into a single
  /// `OQL.Value` text variant by joining with a separator. OQL columns
  /// are scalar, so a collection field collapses to one value; the joined
  /// text is still queryable with `contains` / `eq`.
  public func _toRow(self : [Text]) : OQL.Value {
    #text(Text.join(self.vals(), ", "));
  };
};

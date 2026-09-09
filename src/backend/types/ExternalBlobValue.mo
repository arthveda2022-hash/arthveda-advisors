import Storage "mo:caffeineai-object-storage/Storage";
import OQL "mo:caffeineai-oql";

module {
  /// `_toRow` for `?Storage.ExternalBlob` — converts the optional blob
  /// reference into a single `OQL.Value` variant. We use the empty text
  /// sentinel for `null` so the column stays queryable (`eq value ""`
  /// matches articles without a cover image) and never flips schema type
  /// between rows. The blob itself is opaque binary data and is not
  /// useful as a query column, so we surface a placeholder text marker
  /// when present — the cover image is fetched via the object-storage
  /// mixin, not via OQL.
  public func _toRow(self : ?Storage.ExternalBlob) : OQL.Value {
    switch (self) {
      case null { #text("") };
      case (?_blob) { #text("cover") };
    };
  };
};

import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import MixinViews "mo:caffeineai-data-viewer/MixinViews";
import Types "types/articles";
import ArticlesApi "mixins/articles-api";

actor {
  /// Authorization state — first authenticated user becomes admin.
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);

  /// Object-storage mixin — provides `_immutableObjectStorage*` certificate
  /// methods required for cover-image uploads.
  include MixinObjectStorage();

  /// Articles keyed by slug.
  let articles : Map.Map<Text, Types.Article>;

  /// Public article API (read methods are public; write methods are
  /// admin-gated via `accessControlState`).
  include ArticlesApi(accessControlState, articles);

  /// Platform admin viewer (pre-existing).
  include MixinViews();
};

# Syncs back translations in the master compendium into the component/entrypoint message bundles.
find src/locales/src/components -name "ja.po" -type f -exec msgmerge --compendium src/locales/ja.po /dev/null {} -o {} \;
find src/locales/src/components -name "en.pot" -type f -exec msgmerge --compendium src/locales/en.po /dev/null {} -o {} \;

import type { Manifest } from 'webextension-polyfill'
import type PkgType from '../package.json'
import fs from 'fs-extra'
import { isDev, isFirefox, port, r } from '../scripts/utils'
import { injectPaths, netWorkList } from './composables/injectWhitelist'

export async function getManifest() {
  const pkg = await fs.readJSON(r('package.json')) as typeof PkgType

  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    key: 'thisisthekey', // extention's key
    homepage_url: 'https://domain.com',
    action: {
      default_icon: './assets/icon.png',
      default_popup: './dist/popup/index.html',
    },
    update_url: 'https://domain.com/release/updates.xml',
    options_ui: {
      page: './dist/options/index.html',
      open_in_tab: true,
    },
    background: isFirefox
      ? {
        scripts: ['dist/background/index.mjs'],
        type: 'module',
      }
      : {
        service_worker: './dist/background/index.mjs',
      },
    icons: {
      16: './assets/icon.png',
      48: './assets/icon.png',
      128: './assets/icon.png',
    },
    permissions: [
      'tabs',
      'storage',
      'activeTab',
      'sidePanel',
    ],
    host_permissions: ['<all_urls>'],
    content_scripts: [
      {
        matches: injectPaths,
        js: [
          'dist/contentScripts/index.global.js',
        ],
        css: [
          'dist/contentScripts/extension.css',
        ],
      },
    ],
    web_accessible_resources: [
      {
        resources: [
          'dist/contentScripts/extension.css',
          'assets/injected.js',
        ],
        matches: netWorkList,
      },
    ],
    content_security_policy: {
      extension_pages: isDev
        ? `script-src \'self\' http://localhost:${port} ; object-src \'self\'`
        : 'script-src \'self\'; object-src \'self\'',
    },
    side_panel: {
      default_path: 'dist/sidepanel/index.html',
    },
  }
  // add sidepanel
  if (isFirefox) {
    manifest.sidebar_action = {
      default_panel: 'dist/sidepanel/index.html',
    }
  }
  else {
    // the sidebar_action does not work for chromium based
    (manifest as any).side_panel = {
      default_path: 'dist/sidepanel/index.html',
    }
  }
  // console.log(manifest)

  // FIXME: not work in MV3
  if (isDev && false) {
    // for content script, as browsers will cache them for each reload,
    // we use a background script to always inject the latest version
    // see src/background/contentScriptHMR.ts
    delete manifest.content_scripts
    manifest.permissions?.push('webNavigation')
  }

  return manifest
}

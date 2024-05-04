(defproject clojure-property-based-test "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}
  :plugins [[lein-cloverage "1.2.2"]]
  :dependencies [[org.clojure/clojure "1.11.1"]
                 [prismatic/schema "1.1.12"]
                 [org.clojure/test.check "0.10.0"]
                 [prismatic/schema-generators "0.1.3"]]

  :repl-options {:init-ns clojure-property-based-test.core})
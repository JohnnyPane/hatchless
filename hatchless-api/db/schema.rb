# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_10_05_125042) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "hatch_windows", force: :cascade do |t|
    t.bigint "insect_id", null: false
    t.bigint "river_id", null: false
    t.integer "start_day_of_year", null: false
    t.integer "end_day_of_year", null: false
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["insect_id"], name: "index_hatch_windows_on_insect_id"
    t.index ["river_id"], name: "index_hatch_windows_on_river_id"
  end

  create_table "insects", force: :cascade do |t|
    t.string "common_name"
    t.string "scientific_name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["common_name"], name: "index_insects_on_common_name"
  end

  create_table "rivers", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "water_type"
    t.string "designation"
    t.string "designation_system"
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "hatch_windows", "insects"
  add_foreign_key "hatch_windows", "rivers"
end

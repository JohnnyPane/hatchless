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

ActiveRecord::Schema[8.0].define(version: 2025_12_21_231915) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.string "addressable_type", null: false
    t.bigint "addressable_id", null: false
    t.string "address_1", null: false
    t.string "address_2"
    t.string "city", null: false
    t.string "state", null: false
    t.string "zip_code", null: false
    t.string "country", default: "USA", null: false
    t.decimal "latitude", precision: 10, scale: 6
    t.decimal "longitude", precision: 10, scale: 6
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["addressable_type", "addressable_id"], name: "index_addresses_on_addressable"
  end

  create_table "events", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "start_time", null: false
    t.datetime "end_time"
    t.string "location"
    t.integer "price_cents"
    t.integer "capacity"
    t.integer "status", default: 0, null: false
    t.bigint "fly_shop_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fly_shop_id"], name: "index_events_on_fly_shop_id"
  end

  create_table "fish", force: :cascade do |t|
    t.string "common_name", null: false
    t.string "scientific_name", null: false
    t.text "description"
    t.integer "water_type", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.virtual "common_name_vector", type: :tsvector, as: "to_tsvector('simple'::regconfig, (COALESCE(common_name, ''::character varying))::text)", stored: true
    t.index ["common_name_vector"], name: "index_fish_on_common_name_vector", using: :gin
  end

  create_table "fly_pack_items", force: :cascade do |t|
    t.bigint "fly_pack_id", null: false
    t.bigint "fly_pattern_id", null: false
    t.integer "quantity", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fly_pack_id"], name: "index_fly_pack_items_on_fly_pack_id"
    t.index ["fly_pattern_id"], name: "index_fly_pack_items_on_fly_pattern_id"
  end

  create_table "fly_packs", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.integer "price_cents", null: false
    t.string "currency", default: "USD", null: false
    t.date "available_from"
    t.date "available_to"
    t.bigint "fly_shop_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: true, null: false
    t.index ["fly_shop_id"], name: "index_fly_packs_on_fly_shop_id"
  end

  create_table "fly_packs_fishes", force: :cascade do |t|
    t.bigint "fly_pack_id", null: false
    t.bigint "fish_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fish_id"], name: "index_fly_packs_fishes_on_fish_id"
    t.index ["fly_pack_id"], name: "index_fly_packs_fishes_on_fly_pack_id"
  end

  create_table "fly_patterns", force: :cascade do |t|
    t.string "name", null: false
    t.text "notes"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "creator_id"
    t.string "creator_type"
    t.boolean "approved", default: false
    t.boolean "public", default: false
    t.virtual "name_vector", type: :tsvector, as: "to_tsvector('simple'::regconfig, (COALESCE(name, ''::character varying))::text)", stored: true
    t.index ["approved"], name: "index_fly_patterns_on_approved"
    t.index ["creator_type", "creator_id"], name: "index_fly_patterns_on_creator_type_and_creator_id"
    t.index ["name_vector"], name: "index_fly_patterns_on_name_vector", using: :gin
    t.index ["public"], name: "index_fly_patterns_on_public"
  end

  create_table "fly_shops", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.string "website_url"
    t.string "phone_number"
    t.string "email"
    t.bigint "owner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.virtual "name_vector", type: :tsvector, as: "to_tsvector('simple'::regconfig, (COALESCE(name, ''::character varying))::text)", stored: true
    t.index ["name_vector"], name: "index_fly_shops_on_name_vector", using: :gin
    t.index ["owner_id"], name: "index_fly_shops_on_owner_id"
  end

  create_table "hatch_report_insects", force: :cascade do |t|
    t.bigint "hatch_report_id", null: false
    t.bigint "insect_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hatch_report_id"], name: "index_hatch_report_insects_on_hatch_report_id"
    t.index ["insect_id"], name: "index_hatch_report_insects_on_insect_id"
  end

  create_table "hatch_reports", force: :cascade do |t|
    t.bigint "river_id"
    t.bigint "user_id", null: false
    t.bigint "fly_shop_id"
    t.text "notes"
    t.date "observed_on", null: false
    t.boolean "verified", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fly_shop_id"], name: "index_hatch_reports_on_fly_shop_id"
    t.index ["river_id"], name: "index_hatch_reports_on_river_id"
    t.index ["user_id"], name: "index_hatch_reports_on_user_id"
  end

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

  create_table "hot_flies", force: :cascade do |t|
    t.bigint "fly_shop_id", null: false
    t.bigint "fly_pattern_id", null: false
    t.bigint "river_id"
    t.boolean "active", default: true, null: false
    t.datetime "expires_at"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "min_size"
    t.integer "max_size"
    t.index ["fly_pattern_id"], name: "index_hot_flies_on_fly_pattern_id"
    t.index ["fly_shop_id"], name: "index_hot_flies_on_fly_shop_id"
    t.index ["river_id"], name: "index_hot_flies_on_river_id"
  end

  create_table "insect_fly_patterns", force: :cascade do |t|
    t.bigint "insect_id", null: false
    t.bigint "fly_pattern_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fly_pattern_id"], name: "index_insect_fly_patterns_on_fly_pattern_id"
    t.index ["insect_id"], name: "index_insect_fly_patterns_on_insect_id"
  end

  create_table "insects", force: :cascade do |t|
    t.string "common_name"
    t.string "scientific_name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "life_stage"
    t.json "colors", default: []
    t.integer "min_size"
    t.integer "max_size"
    t.virtual "common_name_vector", type: :tsvector, as: "to_tsvector('simple'::regconfig, (COALESCE(common_name, ''::character varying))::text)", stored: true
    t.index ["common_name_vector"], name: "index_insects_on_common_name_vector", using: :gin
  end

  create_table "jwt_denylists", force: :cascade do |t|
    t.string "jti"
    t.datetime "exp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_denylists_on_jti"
  end

  create_table "posts", force: :cascade do |t|
    t.string "creator_type", null: false
    t.bigint "creator_id", null: false
    t.bigint "river_id"
    t.text "caption"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_type", "creator_id"], name: "index_posts_on_creator"
    t.index ["river_id"], name: "index_posts_on_river_id"
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
    t.virtual "name_vector", type: :tsvector, as: "to_tsvector('simple'::regconfig, (COALESCE(name, ''::character varying))::text)", stored: true
    t.index ["name_vector"], name: "index_rivers_on_name_vector", using: :gin
  end

  create_table "shop_rivers", force: :cascade do |t|
    t.bigint "fly_shop_id", null: false
    t.bigint "river_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fly_shop_id"], name: "index_shop_rivers_on_fly_shop_id"
    t.index ["river_id"], name: "index_shop_rivers_on_river_id"
  end

  create_table "solid_queue_blocked_executions", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.string "queue_name", null: false
    t.integer "priority", default: 0, null: false
    t.string "concurrency_key", null: false
    t.datetime "expires_at", null: false
    t.datetime "created_at", null: false
    t.index ["concurrency_key", "priority", "job_id"], name: "index_solid_queue_blocked_executions_for_release"
    t.index ["expires_at", "concurrency_key"], name: "index_solid_queue_blocked_executions_for_maintenance"
    t.index ["job_id"], name: "index_solid_queue_blocked_executions_on_job_id", unique: true
  end

  create_table "solid_queue_claimed_executions", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.bigint "process_id"
    t.datetime "created_at", null: false
    t.index ["job_id"], name: "index_solid_queue_claimed_executions_on_job_id", unique: true
    t.index ["process_id", "job_id"], name: "index_solid_queue_claimed_executions_on_process_id_and_job_id"
  end

  create_table "solid_queue_failed_executions", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.text "error"
    t.datetime "created_at", null: false
    t.index ["job_id"], name: "index_solid_queue_failed_executions_on_job_id", unique: true
  end

  create_table "solid_queue_jobs", force: :cascade do |t|
    t.string "queue_name", null: false
    t.string "class_name", null: false
    t.text "arguments"
    t.integer "priority", default: 0, null: false
    t.string "active_job_id"
    t.datetime "scheduled_at"
    t.datetime "finished_at"
    t.string "concurrency_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["active_job_id"], name: "index_solid_queue_jobs_on_active_job_id"
    t.index ["class_name"], name: "index_solid_queue_jobs_on_class_name"
    t.index ["finished_at"], name: "index_solid_queue_jobs_on_finished_at"
    t.index ["queue_name", "finished_at"], name: "index_solid_queue_jobs_for_filtering"
    t.index ["scheduled_at", "finished_at"], name: "index_solid_queue_jobs_for_alerting"
  end

  create_table "solid_queue_pauses", force: :cascade do |t|
    t.string "queue_name", null: false
    t.datetime "created_at", null: false
    t.index ["queue_name"], name: "index_solid_queue_pauses_on_queue_name", unique: true
  end

  create_table "solid_queue_processes", force: :cascade do |t|
    t.string "kind", null: false
    t.datetime "last_heartbeat_at", null: false
    t.bigint "supervisor_id"
    t.integer "pid", null: false
    t.string "hostname"
    t.text "metadata"
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.index ["last_heartbeat_at"], name: "index_solid_queue_processes_on_last_heartbeat_at"
    t.index ["name", "supervisor_id"], name: "index_solid_queue_processes_on_name_and_supervisor_id", unique: true
    t.index ["supervisor_id"], name: "index_solid_queue_processes_on_supervisor_id"
  end

  create_table "solid_queue_ready_executions", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.string "queue_name", null: false
    t.integer "priority", default: 0, null: false
    t.datetime "created_at", null: false
    t.index ["job_id"], name: "index_solid_queue_ready_executions_on_job_id", unique: true
    t.index ["priority", "job_id"], name: "index_solid_queue_poll_all"
    t.index ["queue_name", "priority", "job_id"], name: "index_solid_queue_poll_by_queue"
  end

  create_table "solid_queue_recurring_executions", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.string "task_key", null: false
    t.datetime "run_at", null: false
    t.datetime "created_at", null: false
    t.index ["job_id"], name: "index_solid_queue_recurring_executions_on_job_id", unique: true
    t.index ["task_key", "run_at"], name: "index_solid_queue_recurring_executions_on_task_key_and_run_at", unique: true
  end

  create_table "solid_queue_recurring_tasks", force: :cascade do |t|
    t.string "key", null: false
    t.string "schedule", null: false
    t.string "command", limit: 2048
    t.string "class_name"
    t.text "arguments"
    t.string "queue_name"
    t.integer "priority", default: 0
    t.boolean "static", default: true, null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["key"], name: "index_solid_queue_recurring_tasks_on_key", unique: true
    t.index ["static"], name: "index_solid_queue_recurring_tasks_on_static"
  end

  create_table "solid_queue_scheduled_executions", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.string "queue_name", null: false
    t.integer "priority", default: 0, null: false
    t.datetime "scheduled_at", null: false
    t.datetime "created_at", null: false
    t.index ["job_id"], name: "index_solid_queue_scheduled_executions_on_job_id", unique: true
    t.index ["scheduled_at", "priority", "job_id"], name: "index_solid_queue_dispatch_all"
  end

  create_table "solid_queue_semaphores", force: :cascade do |t|
    t.string "key", null: false
    t.integer "value", default: 1, null: false
    t.datetime "expires_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["expires_at"], name: "index_solid_queue_semaphores_on_expires_at"
    t.index ["key", "value"], name: "index_solid_queue_semaphores_on_key_and_value"
    t.index ["key"], name: "index_solid_queue_semaphores_on_key", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "first_name"
    t.string "last_name"
    t.integer "role", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "events", "fly_shops"
  add_foreign_key "fly_pack_items", "fly_packs"
  add_foreign_key "fly_pack_items", "fly_patterns"
  add_foreign_key "fly_packs", "fly_shops"
  add_foreign_key "fly_packs_fishes", "fish"
  add_foreign_key "fly_packs_fishes", "fly_packs"
  add_foreign_key "fly_shops", "users", column: "owner_id"
  add_foreign_key "hatch_report_insects", "hatch_reports"
  add_foreign_key "hatch_report_insects", "insects"
  add_foreign_key "hatch_reports", "fly_shops"
  add_foreign_key "hatch_reports", "rivers"
  add_foreign_key "hatch_reports", "users"
  add_foreign_key "hatch_windows", "insects"
  add_foreign_key "hatch_windows", "rivers"
  add_foreign_key "hot_flies", "fly_patterns"
  add_foreign_key "hot_flies", "fly_shops"
  add_foreign_key "hot_flies", "rivers"
  add_foreign_key "insect_fly_patterns", "fly_patterns"
  add_foreign_key "insect_fly_patterns", "insects"
  add_foreign_key "posts", "rivers"
  add_foreign_key "shop_rivers", "fly_shops"
  add_foreign_key "shop_rivers", "rivers"
  add_foreign_key "solid_queue_blocked_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "solid_queue_claimed_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "solid_queue_failed_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "solid_queue_ready_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "solid_queue_recurring_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "solid_queue_scheduled_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
end

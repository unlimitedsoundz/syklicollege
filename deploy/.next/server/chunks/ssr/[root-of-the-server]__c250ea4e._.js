module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},82649,a=>{a.n(a.i(59570))},64858,a=>{a.n(a.i(76158))},89204,a=>{a.n(a.i(63533))},64967,a=>{a.n(a.i(59042))},58007,a=>{a.n(a.i(76684))},18091,a=>{a.n(a.i(87675))},56394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(46504).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/OneDrive/Documents/syklicollege/src/app/admin/registrar/RegistrarClient.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/OneDrive/Documents/syklicollege/src/app/admin/registrar/RegistrarClient.tsx <module evaluation>","default")},2197,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(46504).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/OneDrive/Documents/syklicollege/src/app/admin/registrar/RegistrarClient.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/OneDrive/Documents/syklicollege/src/app/admin/registrar/RegistrarClient.tsx","default")},91927,a=>{"use strict";a.i(56394);var b=a.i(2197);a.n(b)},85726,a=>{"use strict";var b=a.i(37875),c=a.i(2669);a.i(75325);var d=a.i(17781),e=a.i(91927);async function f(){let a=await (0,c.createClient)(),{data:{user:f}}=await a.auth.getUser();f||(0,d.redirect)("/login");let{data:g}=await a.from("profiles").select("role").eq("id",f.id).single();g?.role!=="ADMIN"&&g?.role;let{data:h}=await a.from("semesters").select("*").order("start_date",{ascending:!1}),{data:i}=await a.from("registration_windows").select("*, semester:semesters(*)"),{data:j}=await a.from("modules").select(`
            id,
            code,
            title,
            capacity,
            module_enrollments(
                id,
                status,
                student:students(
                    id,
                    student_id,
                    user:profiles(first_name, last_name)
                )
            )
        `),{data:k}=await a.from("module_enrollments").select(`
            *,
            student:students(*, user:profiles(*)),
            module:modules(*)
        `).eq("grade_status","PROVISIONAL").not("grade","is",null),{data:l}=await a.from("students").select("*, user:profiles(*), housing_assignments(status, room:housing_rooms(room_number, building:housing_buildings(name)))").order("created_at",{ascending:!1}),{data:m}=await a.from("housing_buildings").select("*, housing_rooms(count, status)"),{data:n}=await a.from("class_sessions").select("*, module:modules(*), semester:semesters(*)").order("day_of_week",{ascending:!0}).order("start_time",{ascending:!0}),{data:o}=await a.from("tuition_payments").select("*, offer:admission_offers(*, application:applications(*, user:profiles(*)))").order("created_at",{ascending:!1}),{data:p}=await a.from("audit_logs").select("*").order("timestamp",{ascending:!1}).limit(20);return(0,b.jsx)("div",{className:"min-h-screen bg-neutral-50/50 p-4 md:p-8",children:(0,b.jsx)("div",{className:"max-w-7xl mx-auto",children:(0,b.jsx)(e.default,{semesters:h||[],windows:i||[],moduleStats:j||[],provisionalGrades:k||[],students:l||[],buildings:m||[],sessions:n||[],auditLogs:p||[],tuitionPayments:o||[]})})})}a.s(["default",()=>f])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__c250ea4e._.js.map